export const formatStatus = (text: string) => {
    const formattedText = text[0].toUpperCase() +
        text.slice(1).toLowerCase();
    return formattedText;
}