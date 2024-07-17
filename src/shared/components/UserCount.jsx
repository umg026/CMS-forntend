import React, { useEffect, useState } from 'react'
import pb from '../../Pocketbase/pocketbase'

function useUserCount() {
    const [content, setContent] = useState("")
    const [admin, setAdmin] = useState("")
    useEffect(() => {
        fecthUsers()
    }, [])

    const fecthUsers = async () => {
        try {
            const records = await pb.collection('user_view').getFullList({
                sort: '-created', filter: 'is_deleted=false'
            });
            const content_author = records?.filter((item, index) => item.role_type == "content_author")
            const admin = records?.filter((item, index) => item.role_type == "admin")
            setAdmin(admin?.length)
            setContent(content_author?.length)

        }
        catch (error) {

        }
    }

    return {
        admin, content

    }
}

export default useUserCount