# Prompts para crear pruebas E2E para la interfaz "position"

| Author       | Jorge Luis Sánchez Ocampo |
| ------------ | ------------------------- |
| LLM          | Claude 3.5 Sonnet         |
| AI Assistant | Cursor                    |

---

```markdown
Eres un experto en automation y E2E y en la librería cypress y se te ha solicitado crear Pruebas E2E para la Interfaz "position":

Debes crear pruebas E2E para verificar los siguientes escenarios:

1. Carga de la Página de Position:
   - Verifica que el título de la posición se muestra correctamente.
   - Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
   - Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
2. Cambio de Fase de un Candidato:
   - Simula el arrastre de una tarjeta de candidato de una columna a otra.
   - Verifica que la tarjeta del candidato se mueve a la nueva columna.
   - Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

Instrucciones:

1. Crea un archivo de prueba position.spec.js en la carpeta /cypress/integration. del proyecto de frontend
2. Escribe pruebas E2E para verificar la carga de la página y el cambio de fase de un candidato.
3. Intercepta los llamados al API necesarios en la usa de referencia @positionRoutes.ts y las respuestas crealas basandote en@schema.prisma
4. Agregar data-testid unicos y alfanumericos a los elementos que consideres
   necesario en @frontend
5. Agrega las configuraciones necesarias
6. la uri del API es http://localhost:3010

Instrucciones ara el drag and drop: crea un comando dragAndDrop que:

1. Acepta un selector de origen y destino
2. Calcula las coordenadas precisas de los elementos usando getBoundingClientRect()
3. Simula una secuencia realista de eventos del mouse (mousedown, mousemove, mouseup)
4. incluye pequeñas pausas para compatibilidad con react-beautiful-dnd
5. fuerza los eventos para garantizar su ejecución
```

```markdown
npm error Missing script: "cypress:open"
```

```markdown
Your project does not contain a default supportFile. We expect a file matching cypress/support/e2e.{js,jsx,ts,tsx} to exist.

If a support file is not necessary for your project, set supportFile to false.

https://on.cypress.io/support-file-missing-or-invalid
```

En este punto tuve que iterar muchas veces para adecuar la prueba de drag and drop, el prompt que me funcionó para adecuar el test fue el siguiente

```markdown
i need you to modify the entire logic for drag and dropt test. first i need to validate that the card and the column or stage i want to move the card are visibles, now the drag and drop function needs to calculate the coordinates and the pixels we have to move the card before drop, to simulate the drag and drop function. have in mind that you have to concatenate the mouse events to get the drag and drop successfully. think the solution carefully
```
