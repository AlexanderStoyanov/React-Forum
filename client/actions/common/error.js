export default function error(type, error) {
    return {
        type: type,
        payload: {
            error
        }
    }
}