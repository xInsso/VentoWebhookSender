document.getElementById('sendButton').addEventListener('click', async () => {
    const webhookUrl = document.getElementById('webhookUrl').value;
    const message = document.getElementById('message').value;
    const embedTitle = document.getElementById('embedTitle').value;
    const embedDescription = document.getElementById('embedDescription').value;
    const embedColor = document.getElementById('embedColor').value;

    if (!webhookUrl || (!message && !embedTitle)) {
        alert('Por favor, completa todos los campos necesarios.');
        return;
    }

    const payload = {
        content: message,
        embeds: []
    };

    if (embedTitle || embedDescription) {
        const embed = {
            title: embedTitle || undefined,
            description: embedDescription || undefined,
            color: embedColor ? parseInt(embedColor.replace('#', ''), 16) : undefined
        };
        payload.embeds.push(embed);
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById('response').innerText = 'Mensaje enviado con éxito!';
            document.getElementById('message').value = ''; // Limpiar el campo de mensaje
            document.getElementById('embedTitle').value = ''; // Limpiar el título del embed
            document.getElementById('embedDescription').value = ''; // Limpiar la descripción del embed
            document.getElementById('embedColor').value = ''; // Limpiar el color del embed
        } else {
            document.getElementById('response').innerText = 'Error al enviar el mensaje.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Error al enviar el mensaje.';
    }
});