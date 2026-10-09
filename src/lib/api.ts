const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

export interface Category {
id: string;
slug: string;
nameBn: string;
icon: string;
}

export interface Product {
id: number;
slug: string;
nameBn: string;
category: string;
image: string;
unit: string;
today: number;
yesterday: number;
lastWeek: number;
lastMonth: number;
change: {
dir: "up" | "down" | "flat";
pct: number;
};
categoryNameBn: string;
markets: {
market: string;
division: string;
min: number;
max: number;
}[];
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
const res = await fetch(`${BASE_URL}/categories`, {
next: {
revalidate: 300,
},
});

if (!res.ok) {
throw new Error("Failed to fetch categories");
}

return res.json();
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
const res = await fetch(`${BASE_URL}/products`, {
next: {
revalidate: 300,
},
});

if (!res.ok) {
throw new Error("Failed to fetch products");
}

return res.json();
}

// Fetch products belonging to a category
export async function getProductsByCategory(
slug: string,
): Promise<Product[]> {
const res = await fetch(
`${BASE_URL}/products?category=${encodeURIComponent(slug)}`,
{
next: {
revalidate: 300,
},
},
);

if (!res.ok) {
throw new Error("Failed to fetch category products");
}

return res.json();
}

// Fetch one product using its slug or ID
export async function getProduct(
slugOrId: string,
): Promise<Product> {
// First, try fetching the product directly.
const res = await fetch(
`${BASE_URL}/products/${encodeURIComponent(slugOrId)}`,
{
next: {
revalidate: 300,
},
},
);

if (res.ok) {
return res.json();
}


const products = await getProducts();

const product = products.find(
(item) =>
item.slug === slugOrId ||
String(item.id) === slugOrId,
);

if (!product) {
throw new Error(`Product not found: ${slugOrId}`);
}

const detailRes = await fetch(
`${BASE_URL}/products/${product.id}`,
{
next: {
revalidate: 300,
},
},
);

if (!detailRes.ok) {
throw new Error("Failed to fetch product details");
}

return detailRes.json();
}
