const response = (status, message, data = null) => {
    if (data === null) {
        return { status: status, message: message }
    }
    else{
        return { status: status, message: message, data:data }
    }
}

module.exports={
    response
}