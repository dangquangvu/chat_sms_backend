const { DriveSchema }
//= require('../schemas/index');

module.exports = {
    count: function(where) {
        return new Promise(resolve => {
            DriveSchema.countDocuments(where).exec((err, result) => {
                if (err) {
                    return resolve(0);
                }
                return resolve(result);
            });
        });
    },

    retry: function(type) {
        console.log(`Retry status: ${type}`);
        var where = { status: type };
        return new Promise((resolve, reject) => {
            DriveSchema.updateMany(where, { status: 0 }).exec(async(err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },

    updateOrInsertOne: function(where, data) {
        return new Promise((resolve, reject) => {
            DriveSchema.findOne(where).exec((err, drive) => {
                if (err) {
                    return reject(err);
                }

                if (!drive) {
                    drive = new DriveSchema(data);
                } else {
                    drive = Object.assign(drive, data);
                }
                drive.save();
                return resolve(drive);
            });
        });
    },

    save: function(data) {
        return new Promise((resolve, reject) => {
            DriveSchema.findOne({ driveid: data.driveid }).exec((err, drive) => {
                if (err) {
                    return reject(err);
                }

                if (!drive) {
                    drive = new DriveSchema(data);
                    drive.save();
                }
                return resolve(drive);
            });
        });
    },

    update: function(id, drive) {
        return new Promise((resolve, reject) => {
            DriveSchema.updateOne({ _id: id }, drive, function(err) {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },

    delete: function(id) {
        return new Promise((resolve, reject) => {
            DriveSchema.remove({ _id: id }, function(err) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },

    findById: function(id) {
        return new Promise((resolve, reject) => {
            DriveSchema.findById(id)
                .populate('account')
                .exec((err, doc) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!doc) {
                        return reject(Error('No Drive found!' + id));
                    }
                    return resolve(doc);
                });
        });
    },

    findOne: function(where) {
        return new Promise((resolve, reject) => {
            DriveSchema.findOne(where)
                // .populate('account')
                // .sort({ _id: -1 })
                // .limit(1)
                // .lean()
                .exec((err, result) => {
                    if (err) {
                        console.log(err);
                        // return reject(err);
                        return resolve(false);
                    }
                    if (!result) {
                        console.log('Drive not found');
                        // return reject(Error('Drive not found'));
                        return resolve(false);
                    }
                    return resolve(result);
                });
        });
    },

    findAll: function(where, offset, limit) {
        // console.log(where, offset, limit);
        return new Promise((resolve, reject) => {
            DriveSchema.find(where)
                .populate('account')
                .sort({
                    _id: -1
                })
                .limit(limit)
                .skip(offset)
                .lean()
                .exec((err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(Error('Query Drive failed!'));
                    }
                    return resolve(result);
                });
        });
    },

    findAll2: function(where, offset, limit) {
        // console.log(where, offset, limit);
        return new Promise((resolve, reject) => {
            DriveSchema.find(where)
                .sort({
                    _id: -1
                })
                .limit(limit)
                .skip(offset)
                .lean()
                .exec((err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(Error('Query Drive failed!'));
                    }
                    return resolve(result);
                });
        });
    },
    findGen2: function(offset = 0) {
        return new Promise((resolve, reject) => {
            DriveSchema.find({
                    $and: [{
                            $or: [{
                                    m3u8_gen: { $exists: false }
                                },
                                {
                                    m3u8_gen: { $exists: true, $in: [null, []] }
                                }
                            ]
                        },
                        { status: 2 }
                    ]
                })
                .limit(2000)
                .skip(offset)
                .exec((err, result) => {
                    if (err) {
                        return reject(Error('Query Drive failed'));
                    }
                    return resolve(result);
                });
        });
    },
    // find all with offset
    findGen: function(offset = 0) {
        // const offset = 0;
        return new Promise((resolve, reject) => {
            DriveSchema.find({
                    $and: [{ m3u8_gen: { $exists: true, $ne: [] } }, { status: 2 }]
                })
                .sort({
                    _id: -1
                })
                .limit(2000)
                .skip(offset)
                .exec((err, result) => {
                    if (err) {
                        return reject(Error('Query Drive failed'));
                    }
                    return resolve(result);
                });
        });
    },
    // find all m3u8_gen empty
    findGen3: function(offset = 0) {
        return new Promise((resolve, reject) => {
            DriveSchema.find({
                    $and: [{ m3u8_gen: { $in: [null, []] } }, { status: 2 }]
                })
                .limit(2000)
                .skip(offset)
                .exec((err, result) => {
                    if (err) {
                        return reject(Error('Query Drive failed'));
                    }
                    return resolve(result);
                });
        });
    }
};