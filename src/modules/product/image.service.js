async function createImages({ client, productId, images }) {
  const query = `
    INSERT INTO product_images (product_id, image_url, sort_order) 
    VALUES ($1, $2, $3) RETURNING *
  `;

  const createdImages = [];

  for (let i = 0; i < images.length; i++) {
    const values = [productId, images[i].imageUrl, images[i].sortOrder];
    const result = await client.query(query, values);
    createdImages.push(result.rows[0]);
  }

  return createdImages;
}

export default { createImages };
