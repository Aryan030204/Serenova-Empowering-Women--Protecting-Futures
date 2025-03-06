const getUserProfile = (req,res) => {
    try{
    }catch(err){
        res.status(404).json({
            success: false,
            message: 'something went wrong',
            Error: err.message
        });
    }
}

module.exports = getUserProfile;