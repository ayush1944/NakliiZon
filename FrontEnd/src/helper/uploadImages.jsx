const url = `https://api.cloudinary.com/v1_1/dke3lb44y/image/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "NakliZon");

    try {
        const dataResponse = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!dataResponse.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await dataResponse.json();
        return data;
    } catch (error) {
        console.error("Image upload error:", error);
        throw error;
    }
};

export default uploadImage;