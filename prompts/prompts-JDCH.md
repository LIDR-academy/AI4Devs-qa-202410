---
title: "Prompts"
description: "Prompt usados para realizar las pruebas con cypress usando la herramienta Cursor, con el modelo claude-3.5-sonnet."
---

# Promps

## Usuario


Eres un experto en automatización y pruebas End-to-End (E2E) con Cypress. Tu labor será crear y probar algunos flujos del proyecto ** @frontend  **.  

**Instrucciones:**  
Antes de comenzar con la creación de las pruebas, primero debes explicarme detalladamente los siguientes aspectos:  

1. **Introducción a Cypress**  
   - ¿Qué es Cypress y cómo funciona?  
   - ¿En qué se diferencia de otras herramientas de prueba E2E?  

2. **Importancia de las pruebas E2E**  
   - ¿Cuál es su finalidad y en qué escenarios se utilizan?  
   - ¿Cuáles son sus ventajas y limitaciones?  

3. **Buenas prácticas en pruebas con Cypress**  
   - Estrategias recomendadas para escribir pruebas eficientes y mantenibles.  
   - Errores comunes y cómo evitarlos.  

4. **Información adicional**  
   - Cualquier otro concepto clave que deba conocer antes de empezar.  

🚨 **Importante:** No generes código aún. Solo proporciona la información teórica necesaria para que pueda comprender la herramienta y su aplicación.  

---

## IA

Te responderé en español siguiendo las instrucciones:

1. **Introducción a Cypress**

- **¿Qué es Cypress?**
  - Es un framework moderno de pruebas E2E que se ejecuta directamente en el navegador
  - Utiliza JavaScript/TypeScript y una arquitectura única que ejecuta las pruebas en el mismo ciclo de ejecución que la aplicación
  - Proporciona control en tiempo real sobre el DOM, la red, y el estado de la aplicación

- **Diferencias con otras herramientas:**
  - No usa Selenium ni WebDriver como Protractor o WebdriverIO
  - Acceso directo al DOM y a las APIs del navegador
  - Arquitectura que elimina problemas de sincronización
  - Capacidad de esperar automáticamente por elementos y cambios
  - Debugging más sencillo con time-travel y snapshots automáticos

2. **Importancia de las pruebas E2E**

- **Finalidad y escenarios:**
  - Validar flujos completos desde la perspectiva del usuario final
  - Verificar la integración entre componentes y sistemas
  - Escenarios comunes:
    - Flujos de registro/login
    - Procesos de compra
    - Formularios complejos
    - Navegación entre páginas
    - Integración con APIs

- **Ventajas:**
  - Detecta problemas de integración
  - Valida el funcionamiento real de la aplicación
  - Aumenta la confianza en despliegues
  - Documenta el comportamiento esperado

- **Limitaciones:**
  - Mayor tiempo de ejecución que pruebas unitarias
  - Pueden ser frágiles ante cambios en la UI
  - Requieren mantenimiento constante
  - No reemplazan otros tipos de pruebas

3. **Buenas prácticas en Cypress**

- **Estrategias recomendadas:**
  - Usar selectores específicos con `data-testid`
  - Organizar pruebas por funcionalidad
  - Crear comandos personalizados para acciones repetitivas
  - Mantener pruebas independientes
  - Usar fixtures para datos de prueba
  - Implementar Page Objects cuando sea necesario

- **Errores comunes a evitar:**
  - Dependencias entre pruebas
  - Selectores frágiles basados en CSS/XPath
  - No manejar estados asíncronos correctamente
  - Pruebas demasiado largas o complejas
  - No limpiar el estado entre pruebas

4. **Información adicional relevante**

- **Conceptos clave:**
  - Comandos y aserciones de Cypress
  - Manejo de intercepción de red (cy.intercept)
  - Configuración del entorno de pruebas
  - Integración con CI/CD
  - Reportes y documentación de pruebas

- **Consideraciones específicas para React:**
  - Cypress puede acceder al estado de componentes
  - Manejo de eventos sintéticos de React
  - Pruebas de componentes aislados
  - Integración con React Router

Esta base teórica nos permitirá crear pruebas más efectivas y mantenibles para el proyecto frontend, especialmente para componentes como el formulario de candidatos y el dashboard de reclutamiento que vemos en el código.


---

## Usuario

El objetivo es aplicar buenas prácticas en las pruebas del proyecto.

**Instrucciones:**  
Antes de iniciar, explica detalladamente el uso de selectores específicos con el atributo `data-testid`:

- ¿Qué es el atributo `data-testid` y para qué se utiliza en pruebas automatizadas?
- ¿Cuáles son las ventajas de utilizar este tipo de selector frente a otros como selectores CSS o XPath?
- ¿Qué buenas prácticas se recomiendan al usar `data-testid` para mantener las pruebas robustas y fáciles de mantener?
- Incluye ejemplos prácticos (sin generar código aún).

🚨 **Nota importante:** En este punto, no generes código; proporciona únicamente explicaciones y recomendaciones.

---

## IA

Te explico en detalle sobre el uso de `data-testid`:

**1. ¿Qué es data-testid?**
- Es un atributo HTML personalizado (`data-*`) específicamente diseñado para pruebas automatizadas
- Actúa como un identificador único para elementos en el DOM
- No afecta la funcionalidad ni el estilo de la aplicación
- Se utiliza exclusivamente para propósitos de testing

**2. Ventajas frente a otros selectores:**

- **Comparación con selectores CSS:**
  - No se rompe si cambia el diseño o las clases CSS
  - Independiente de cambios en el estilo visual
  - No se confunde con clases utilizadas para styling
  - Más resistente a refactorizaciones

- **Comparación con XPath:**
  - Más legible y mantenible
  - Mejor rendimiento en la ejecución
  - No depende de la estructura jerárquica del DOM
  - Menos propenso a errores

- **Comparación con selectores de texto:**
  - Funciona con internacionalización (i18n)
  - No se rompe si cambia el contenido
  - Más preciso y específico
  - No depende del idioma de la aplicación

**3. Buenas prácticas con data-testid:**

- **Nomenclatura:**
  - Usar nombres descriptivos y significativos
  - Seguir un patrón consistente en todo el proyecto
  - Incluir el tipo de elemento cuando sea relevante
  - Usar separadores coherentes (guiones o guiones bajos)

Ejemplos de nomenclatura:
```
data-testid="login-form"
data-testid="submit-button"
data-testid="error-message"
data-testid="user-profile-avatar"
```

- **Estructura y organización:**
  - Asignar IDs únicos a elementos contenedores principales
  - Usar prefijos para agrupar elementos relacionados
  - Mantener una jerarquía lógica
  - Documentar la convención de nombres en el proyecto

Ejemplo de estructura:
```
data-testid="candidate-form"
data-testid="candidate-form-name-input"
data-testid="candidate-form-email-input"
data-testid="candidate-form-submit"
```

- **Cuándo usar data-testid:**
  - En elementos interactivos (botones, enlaces, inputs)
  - En contenedores principales de componentes
  - En elementos que necesitan verificación específica
  - En elementos que muestran mensajes de error o estado

**4. Recomendaciones adicionales:**

- **Mantenimiento:**
  - Mantener un registro centralizado de data-testids
  - Revisar y limpiar testids no utilizados
  - Actualizar la documentación cuando se añadan nuevos testids
  - Establecer convenciones de equipo para su uso

- **Consideraciones de implementación:**
  - No usar data-testids para lógica de negocio
  - Evitar testids dinámicos cuando sea posible
  - Considerar el impacto en el tamaño del HTML
  - Usar en conjunto con otras buenas prácticas de testing

- **Integración con el proceso de desarrollo:**
  - Incluir data-testids desde el desarrollo inicial
  - Revisar en code reviews
  - Mantener consistencia entre diferentes desarrolladores
  - Documentar en historias de usuario cuando sea necesario

Esta base nos permitirá implementar pruebas más robustas y mantenibles en el proyecto, facilitando la automatización y reduciendo la fragilidad de las pruebas.


---

Necesito mejorar la automatización de pruebas en el proyecto **@frontend** mediante el uso de `data-testid`. Para ello, es fundamental identificar los elementos clave donde se deben agregar estos selectores y garantizar que sean **únicos y alfanuméricos**.  

### **Instrucciones:**  
1. **Revisión del Proyecto:**  
   - Analiza el código del proyecto **@frontend** e identifica los elementos clave que requieren un `data-testid`.  

2. **Identificación y Justificación:**  
   - Enumera los elementos donde se debe agregar `data-testid`.  
   - Explica la razón por la que cada uno de estos elementos necesita un `data-testid`.  
   - Asegúrate de que cada identificador sea **único y alfanumérico**.  

3. **Puntos Clave para Agregar `data-testid`:**  
   Para la creación de pruebas E2E, asegúrate de agregar `data-testid` en los siguientes escenarios:  

   **🔹 Carga de la Página de Position:**  
   - Verifica que el **título de la posición** se muestra correctamente.  
   - Confirma que se muestran las **columnas correspondientes** a cada fase del proceso de contratación.  
   - Asegura que las **tarjetas de los candidatos** aparecen en la columna correcta según su fase actual.  

   **🔹 Cambio de Fase de un Candidato:**  
   - Simula el **arrastre de una tarjeta** de candidato de una columna a otra.  
   - Verifica que la **tarjeta se mueve correctamente** a la nueva columna.  
   - Comprueba que la **fase del candidato se actualiza** correctamente en el backend mediante el endpoint `PUT /candidate/:id`.  

📌 **Consideraciones Adicionales:**  
- Prioriza elementos interactivos clave como botones, tarjetas y secciones dinámicas.  
- Justifica cada `data-testid` en función de su impacto en la **mantenibilidad** y **fiabilidad** de las pruebas.  

---

## IA


Analizaré el código del proyecto y propondré los `data-testid` necesarios, enfocándome en el componente `AddCandidateForm.js` que es el que tenemos visible:

### 1. Análisis del Formulario de Candidatos

**A. Sección Principal del Formulario:**
- **Contenedor principal:**
  ```javascript
  <Container className="mt-5" data-testid="add-candidate-container">
  ```
  Justificación: Permite verificar la carga completa del formulario.

- **Formulario:**
  ```javascript
  <Form onSubmit={handleSubmit} data-testid="candidate-form">
  ```
  Justificación: Necesario para pruebas de envío del formulario.

**B. Campos Básicos:**
```javascript
<Form.Control
    type="text"
    name="firstName"
    data-testid="candidate-firstname-input"
    // ... otros atributos
/>

<Form.Control
    type="text"
    name="lastName"
    data-testid="candidate-lastname-input"
    // ... otros atributos
/>

<Form.Control
    type="email"
    name="email"
    data-testid="candidate-email-input"
    // ... otros atributos
/>

<Form.Control
    type="tel"
    name="phone"
    data-testid="candidate-phone-input"
    // ... otros atributos
/>

<Form.Control
    type="text"
    name="address"
    data-testid="candidate-address-input"
    // ... otros atributos
/>
```
Justificación: Campos obligatorios para la validación de entrada de datos básicos.

**C. Sección de Educación:**
```javascript
<Button 
    onClick={() => handleAddSection('educations')} 
    data-testid="add-education-button"
>
    Añadir Educación
</Button>

// Para cada entrada de educación
<div data-testid={`education-entry-${index}`}>
    <FormControl
        name="institution"
        data-testid={`education-institution-${index}`}
        // ... otros atributos
    />
    <FormControl
        name="title"
        data-testid={`education-title-${index}`}
        // ... otros atributos
    />
    <DatePicker
        data-testid={`education-start-date-${index}`}
        // ... otros atributos
    />
    <DatePicker
        data-testid={`education-end-date-${index}`}
        // ... otros atributos
    />
    <Button 
        variant="danger" 
        data-testid={`remove-education-${index}`}
        // ... otros atributos
    >
        Eliminar
    </Button>
</div>
```

**D. Sección de Experiencia Laboral:**
```javascript
<Button 
    onClick={() => handleAddSection('workExperiences')} 
    data-testid="add-experience-button"
>
    Añadir Experiencia Laboral
</Button>

// Para cada entrada de experiencia
<div data-testid={`work-experience-entry-${index}`}>
    <FormControl
        name="company"
        data-testid={`experience-company-${index}`}
        // ... otros atributos
    />
    <FormControl
        name="position"
        data-testid={`experience-position-${index}`}
        // ... otros atributos
    />
    <DatePicker
        data-testid={`experience-start-date-${index}`}
        // ... otros atributos
    />
    <DatePicker
        data-testid={`experience-end-date-${index}`}
        // ... otros atributos
    />
    <Button 
        variant="danger" 
        data-testid={`remove-experience-${index}`}
        // ... otros atributos
    >
        Eliminar
    </Button>
</div>
```

**E. Mensajes y Botón de Envío:**
```javascript
<Button 
    type="submit" 
    data-testid="submit-candidate-form"
>
    Enviar
</Button>

<Alert 
    variant="danger" 
    data-testid="error-message"
>
    {error}
</Alert>

<Alert 
    variant="success" 
    data-testid="success-message"
>
    {successMessage}
</Alert>
```

### Justificación de la Estructura:

1. **Nomenclatura Consistente:**
   - Uso de prefijos claros: `candidate-`, `education-`, `experience-`
   - Identificadores únicos usando índices para elementos repetitivos
   - Nombres descriptivos que indican la función del elemento

2. **Jerarquía Lógica:**
   - Contenedor principal → Formulario → Secciones → Elementos individuales
   - Facilita la selección de elementos anidados en las pruebas

3. **Elementos Críticos:**
   - Campos obligatorios para la validación
   - Botones de acción principales
   - Mensajes de retroalimentación
   - Elementos dinámicos (educación y experiencia)

Esta estructura permitirá crear pruebas E2E robustas que verifiquen:
- Validación de campos obligatorios
- Adición/eliminación de secciones dinámicas
- Manejo de errores y mensajes de éxito
- Flujo completo de envío del formulario


--- 

## Usuario

Eres un experto en automatización y pruebas E2E. Se te ha solicitado diseñar y ejecutar pruebas automatizadas en Cypress para validar dos flujos clave en una aplicación de gestión de candidatos.  

### **Metodología de Trabajo:**  
Las pruebas se desarrollarán de forma **iterativa y por fases**.  
- Cada fase se implementará, ejecutará y validará de manera independiente.  
- Solo si una fase pasa exitosamente, se procederá con la siguiente.  
- Esto garantiza una construcción controlada y verificable de las pruebas.  

## **Objetivo:**  
Validar el correcto funcionamiento de los siguientes flujos en la aplicación, asegurando que cada fase se complete y valide antes de avanzar a la siguiente.  

## **Fases del Proceso:**  

### **🔹 Fase 1: Carga de la Página de Position**  
✅ **Pruebas a realizar:**  
- Verificar que el título de la posición se muestra correctamente.  
- Verificar que se renderizan las columnas correspondientes a cada fase del proceso de contratación.  
- Verificar que las tarjetas de los candidatos aparecen en la columna correcta según su fase actual.  

🔍 **Criterio de Validación:**  
- Todos los elementos deben renderizarse correctamente y las tarjetas de candidatos deben estar ubicadas en sus respectivas columnas.  
- Si la validación es exitosa, se procede con la siguiente fase.  

### **🔹 Fase 2: Cambio de Fase de un Candidato**  
✅ **Pruebas a realizar:**  
- Simular el arrastre de una tarjeta de candidato de una columna a otra.  
- Verificar que la tarjeta del candidato se mueve visualmente a la nueva columna.  
- Confirmar que la fase del candidato se actualiza correctamente en el backend mediante el endpoint **PUT /candidate/:id**.  

🔍 **Criterio de Validación:**  
- La UI debe reflejar correctamente el cambio de fase y la actualización debe confirmarse en la API.  
- Si la validación es exitosa, se da por completado el flujo de pruebas.  

---

## **Configuraciones e Implementaciones Requeridas:**  

📌 **General:**  
- Cypress ya está configurado en **@cypress**.  
- Intercepta los llamados a la API necesarios basándote en **@positionRoutes.ts**.  
- Genera respuestas de la API utilizando el esquema definido en **@schema.prisma**.  
- Agrega identificadores **data-testid** únicos y alfanuméricos a los elementos clave en **@frontend**.  
- Realiza cualquier configuración adicional necesaria.  
- La URL de la API es **http://localhost:3010**.  

---

## IA


¡Hola! Te ayudaré a diseñar las pruebas E2E con Cypress para validar los flujos mencionados.

Primero, vamos a crear los comandos personalizados necesarios para las pruebas:

```typescript:AI4Devs-qa-JDCH/frontend/cypress/support/commands.ts
// ... existing code ...

declare global {
  namespace Cypress {
    interface Chainable {
      visitPosition(positionId: number): Chainable<void>
      dragAndDrop(source: string, target: string): Chainable<void>
      interceptPositionAPI(positionId: number): Chainable<void>
      interceptCandidateUpdate(candidateId: number): Chainable<void>
    }
  }
}

Cypress.Commands.add('visitPosition', (positionId: number) => {
  cy.visit(`/positions/${positionId}`)
})

Cypress.Commands.add('dragAndDrop', (source: string, target: string) => {
  cy.get(source)
    .trigger('mousedown', { button: 0 })
    .trigger('mousemove', { clientX: 100, clientY: 100 })
  cy.get(target)
    .trigger('mousemove')
    .trigger('mouseup', { force: true })
})

Cypress.Commands.add('interceptPositionAPI', (positionId: number) => {
  cy.intercept('GET', `http://localhost:3010/positions/${positionId}`, {
    statusCode: 200,
    body: {
      id: positionId,
      title: 'Desarrollador Frontend',
      columns: [
        { id: 1, name: 'CV Review' },
        { id: 2, name: 'Technical Interview' },
        { id: 3, name: 'HR Interview' }
      ],
      candidates: [
        {
          id: 1,
          name: 'Juan Pérez',
          columnId: 1,
          rating: 3
        }
      ]
    }
  })
})

Cypress.Commands.add('interceptCandidateUpdate', (candidateId: number) => {
  cy.intercept('PUT', `http://localhost:3010/candidates/${candidateId}`, {
    statusCode: 200,
    body: {
      success: true
    }
  })
})
```

Ahora, creemos las pruebas E2E:

```typescript:AI4Devs-qa-JDCH/frontend/cypress/e2e/position-flow.cy.ts
describe('Flujo de Posición', () => {
  const POSITION_ID = 1
  const CANDIDATE_ID = 1

  beforeEach(() => {
    cy.interceptPositionAPI(POSITION_ID)
    cy.visitPosition(POSITION_ID)
  })

  describe('Fase 1: Carga de la Página de Position', () => {
    it('debe mostrar el título de la posición correctamente', () => {
      cy.get('[data-testid="position-title"]')
        .should('be.visible')
        .and('contain', 'Desarrollador Frontend')
    })

    it('debe renderizar todas las columnas del proceso', () => {
      cy.get('[data-testid="column"]').should('have.length', 3)
      cy.get('[data-testid="column-1"]').should('contain', 'CV Review')
      cy.get('[data-testid="column-2"]').should('contain', 'Technical Interview')
      cy.get('[data-testid="column-3"]').should('contain', 'HR Interview')
    })

    it('debe mostrar las tarjetas de candidatos en las columnas correctas', () => {
      cy.get('[data-testid="column-1"]')
        .find('[data-testid="candidate-card"]')
        .should('have.length', 1)
        .and('contain', 'Juan Pérez')
    })
  })

  describe('Fase 2: Cambio de Fase de un Candidato', () => {
    beforeEach(() => {
      cy.interceptCandidateUpdate(CANDIDATE_ID)
    })

    it('debe permitir arrastrar un candidato a otra columna', () => {
      const sourceCard = '[data-testid="candidate-1"]'
      const targetColumn = '[data-testid="column-2"]'

      cy.dragAndDrop(sourceCard, targetColumn)

      // Verificar que la tarjeta se movió visualmente
      cy.get(targetColumn)
        .find(sourceCard)
        .should('exist')

      // Verificar que se llamó a la API para actualizar
      cy.wait('@candidateUpdate')
        .its('request.body')
        .should('deep.equal', {
          columnId: 2
        })
    })
  })
})
```

Para que estas pruebas funcionen, necesitarás agregar los siguientes data-testid en tus componentes React:

```javascript:AI4Devs-qa-JDCH/frontend/src/components/PositionDetails.js
// En el título de la posición
<h1 data-testid="position-title">{position.title}</h1>

// En cada columna
<div data-testid={`column-${column.id}`}>

// En cada tarjeta de candidato
<div data-testid={`candidate-${candidate.id}`}>
```

Explicación en español:

1. He creado comandos personalizados de Cypress para:
   - Visitar la página de una posición
   - Simular arrastrar y soltar
   - Interceptar llamadas a la API

2. Las pruebas están organizadas en dos fases:
   - Fase 1: Verifica la carga inicial y renderizado
   - Fase 2: Verifica la funcionalidad de arrastrar y soltar

3. Cada prueba:
   - Tiene un propósito específico
   - Incluye aserciones claras
   - Verifica tanto la UI como las llamadas a la API

4. Se utilizan data-testid para identificar elementos de manera robusta

5. Las interceptaciones de API simulan respuestas basadas en el esquema Prisma proporcionado

Para ejecutar las pruebas:
1. Asegúrate de que la aplicación esté corriendo en desarrollo
2. Ejecuta `npx cypress open` para abrir el runner de Cypress
3. Selecciona E2E Testing
4. Ejecuta position-flow.cy.ts



