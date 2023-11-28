export default async function getData() {
    const res = await fetch('https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd', {
        cache: 'force-cache',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return data.products;
}