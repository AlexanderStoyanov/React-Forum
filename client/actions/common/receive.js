export default function receive(type, payload) {
    return {
        type: type,
        payload: payload,
        receivedAt: Date.now()
    }
}