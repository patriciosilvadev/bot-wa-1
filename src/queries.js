exports.query = {
    insertAfterUsers (data) {
        const params = [
            data.cliente,
        ]
        const query = `
            INSERT INTO after_users SET
                cliente = ?,       
        `
        return { query, params }
    },
    selectUsers () {
        const query = `
        SELECT * FROM users_now ;
        `
        return query;
    },
    VerifyUser (data) {
        const params = [
            data.user
        ]
        const query = `
        SELECT * FROM users_now WHERE cliente=?;
        `
        return { query, params }
    },
    selectAfterUsers () {
        const query = `
        SELECT * FROM after_users ;
        `
        return query;
    },
    UpdateAfterUsers(data)
    {
        const params = [
            data.cliente,
            data.number
        ]
        const query = `
        INSERT INTO after_users SET
        cliente = ? , 
        number = ? ;
        `
        //SET SQL_SAFE_UPDATES=0;
        return { query, params }

    },
    CreateNewUsers(data)
    {
        const params = [
            data.user,
            data.Phone,
            data.email,
            data.password
        ]
        const query = `
        INSERT INTO users_now SET
        cliente = ? , 
        number = ?,
        email = ?,
        password = ?;
        `
        //SET SQL_SAFE_UPDATES=0;
        return { query, params }

    },
    VerifyPhone (data) {
        const params = [
            data.Phone
        ]
        const query = `
        SELECT * FROM users_now WHERE number= ?;
        `
        return { query, params }
    },

}

