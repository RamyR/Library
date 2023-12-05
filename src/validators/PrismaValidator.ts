const handlePrismaError = (err:any ) => {
    console.log(err)
    switch (err.code) {
        case 'P2002':
            // handling duplicate key errors
            return {message: `Duplicate field value: ${err.meta.target}`};
        case 'P2014':
            // handling invalid id errors
            return {message: `Invalid ID: ${err.meta.target}`};
        case 'P2003':
            // handling invalid data errors
            return {message: `Invalid input data: ${err.meta.field_name}`};
        case 'P2025':
            // handling invalid data errors
            return {message: `Record To Delete OR Update was not found!`};
        default:
            // handling all other errors
            return {message: `Something went wrong: ${err.message}`};
    }
};

export default handlePrismaError;