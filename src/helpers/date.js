import moment from "moment"

export const formatDate = s => {
    return moment(s).format('YYYY-MM-DD')
}