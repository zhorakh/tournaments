import axios from "axios"

export const Http = {
    get: url => {
        return new Promise((resolve, reject) => {
            let headers = {
                "Content-Type": "application/json",
            }
            axios.get(url, {
                headers: headers
            })
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            let headers = {
                "Content-Type": "application/json"
            }
            axios.post(url, data, {
                headers: headers
            })
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    }
}
