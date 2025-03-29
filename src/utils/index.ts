const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const getFullImageUrl = (text: string): string => {
    return baseUrl+text;
}