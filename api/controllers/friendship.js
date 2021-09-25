const mongoose = require('mongoose');

const Friendship = require('../models/friendship');
const User = require('../models/user');

const FriendshipType = {
    ADD_FRIEND : 0, 
    REQUESTED: 1,
    PENDING: 2,
    FRIEND: 3

}
const send = async (req, res ) => {
    const {_id: UserA } = req.body.user;
    const UserB = req.body.toUser._id;
    
    const docA = await Friendship.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: FriendshipType.REQUESTED }},
        { upsert: true, new: true }
    )
    const docB = await Friendship.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { $set: { status: FriendshipType.PENDING }},
        { upsert: true, new: true }
    )

    const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $push: { friends: docA._id }}
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $push: { friends: docB._id }}
    )

    res.status(200).json({
        docA
    })
}


const acceptRequest = async (req, res ) => {
    const {_id: UserA } = req.body.user;
    const UserB = req.body.toUser._id;
    await Friendship.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: FriendshipType.FRIEND }}
    )
    
    await Friendship.findOneAndUpdate(
        { recipient: UserA ,requester: UserB },
        { $set: { status: FriendshipType.FRIEND }}
    )
    
    res.status(200).json({
        res: 'success'
    })
}

const rejectRequest = async (req, res ) => {
    const {_id: UserA } = req.body.user;
    const UserB = req.body.toUser._id;

    const docA = await Friendship.findOneAndRemove(
        { requester: UserA, recipient: UserB }
    )
    const docB = await Friendship.findOneAndRemove(
        { recipient: UserA, requester: UserB }
    )
    const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $pull: { friends: docA._id }}
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $pull: { friends: docB._id }}
    )
    
    res.status(200).json({
        res: 'success'
    })
}

module.exports  = {send, acceptRequest, rejectRequest}