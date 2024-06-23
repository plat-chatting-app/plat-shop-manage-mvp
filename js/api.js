export const PLAT_SERVER_URL = 'http://3.35.37.12:8211'

const headers = {
    identifier: '9a192abb-6e50-4ab5-bac4-b7e593362268'
}

export async function fetchMarketDetail(id) {
    const url = new URL(`/promotions/markets/${id}`, PLAT_SERVER_URL); // 기본 URL을 실제 API의 URL로 변경하십시오.
    url.searchParams.append('current', getCurrentFormattedTime());

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching market detail:', error);
    }
}

function getCurrentFormattedTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
