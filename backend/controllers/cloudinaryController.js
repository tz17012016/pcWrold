import cloudinary from 'cloudinary';
import asyncHandler from 'express-async-handler';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadimages = asyncHandler(async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.images, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

export const removeImages = asyncHandler(async (req, res) => {
  let image_id = req.body.public_id;

  await cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send('Image has bean removed');
  });
});
