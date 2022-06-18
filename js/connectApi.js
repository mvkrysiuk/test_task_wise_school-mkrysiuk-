const urlPath = 'http://localhost/activity_tracker/php/selectDB';

export async function getDataFromApi() {
    const response = await fetch(urlPath);
    const data = await response.json();
        return data;
}

