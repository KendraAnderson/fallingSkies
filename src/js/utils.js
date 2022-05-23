export async function convertToJson(res) {
    let jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "servicesError", message: jsonResponse };
    }
  }