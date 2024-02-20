export default function getJWTSecret() {
    const secret = process.env.SECRET
    if (!secret || secret?.length === 0) {
        return null;
    }
    return secret;
}