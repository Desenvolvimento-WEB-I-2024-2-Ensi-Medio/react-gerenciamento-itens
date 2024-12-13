// src/services/api.js

const API_URL = 'http://131.0.119.242';

export async function login(username, password) {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

export async function register(username, password) {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        return response.json();
    } catch (error) {
        return {
            success: false,
            error: "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde."
        };
    }
}

export async function getItems(token) {
    const response = await fetch(`${API_URL}/items`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export async function deleteItem(token, itemId) {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const responseData = await response.json();
    if (response.status === 200) {
        return { success: true, message: responseData.message || 'Item excluído com sucesso' };
    } else {
        return { success: false, error: responseData.message || 'Erro ao excluir item' };
    }
}

// Função para adicionar um novo item
export async function addItem(token, name) {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });

    const data = await response.json();
    if (response.status === 201) {
        return { success: true, item: data };
    } else {
        return { success: false, error: data.error || 'Erro ao adicionar item' };
    }
}

// Função para atualizar um item existente
export async function updateItem(token, id, name) {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });

    const data = await response.json();
    if (response.status === 200) {
        return { success: true, item: data };
    } else {
        return { success: false, error: data.message || 'Erro ao atualizar item' };
    }
}
