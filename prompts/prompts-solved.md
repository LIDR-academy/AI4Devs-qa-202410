Eres un experto en automation y E2E y se te ha solicitado probar los siguientes 2
flujos
1. Carga de la Página de Position:
- Verifica que el título de la posición se muestra correctamente.
- Verifica que se muestran las columnas correspondientes a cada fase del
proceso de contratación.
- Verifica que las tarjetas de los candidatos se muestran en la columna correcta
según su fase actual.
2. Cambio de Fase de un Candidato:
- Simula el arrastre de una tarjeta de candidato de una columna a otra.
- Verifica que la tarjeta del candidato se mueve a la nueva columna.
- Verifica que la fase del candidato se actualiza correctamente en el backend
mediante el endpoint PUT /candidate/:id .
instrucciones:
+ :: • Cypress ya esta configurado en @cypress
• Intercepta los llamados al API necesarios en la usa de referencia
@positionRoutes.ts y las respuestas crealas basandote en @schema.prisma
• Agregar data-testid unicos y alfanumericos a los elementos que consideres
necesario en
@frontend
• Agrega las configuraciones necesarias
• la url del API es http://localhost:3010
instrucciones ara el drag and drop: crea un comando dragAndDrop que:|
• Acepta un selector de origen y destino
• Calcula las coordenadas precisas de los elementos usando
getBoundingClientRect
• Simula una secuencia realista de eventos del mouse (mousedown, mousemove,
mouseup) |
• Incluye pequeñas pausas para compatibilidad con react-beautiful-dnd
• fuerza los eventos para asegurar su ejecución