// ==========================================
// VARIABLES GLOBALES
// ==========================================
let songTitleInput;
let lyricsEditor;
let lineCountElement;
let wordCountElement;
let saveIndicator;
let toggleConceptBtn;
let conceptPanel;
let conceptQueTextarea;
let conceptQuienTextarea;
let conceptParaQueTextarea;
let conceptComoTextarea;

// Variables para panel de preguntas
let toggleQuestionsBtn;
let questionsPanel;
let questionsTextarea;

// Variables para panel de notas
let toggleNotesBtn;
let closeNotesBtn;
let notesPanel;
let notesOverlay;
let notesTabs;
let notesTabContents;
let notesTextareas = {};

// Variables para panel de Plan de Semilla
let toggleSeedPlanBtn;
let seedPlanPanel;
let seedPlanSeparator;

// NUEVO: Variable para categoría de título
let titleCategorySelect;
let titleCategoryHint;

// Variables para flujo Semilla Creativa
let openSeedFlowBtn;
let seedFlowContainer;
let closeSeedFlow;
let seedInput;
let exploreIdea;
let seedPhase1;
let seedPhase2;
let seedPhase3;
let backToPhase1;
let backToPhase2;
let goToBlueprint;
let finishBlueprint;
let displaySeed;
let explorationCategories;
let questionSets;

// Variables para las 3 secciones de canvas
let seedCanvasReal;
let seedCanvasSimbolico;
let seedCanvasHistoria;
let canvasSections;

// Variables para blueprint
let ideasSidebarContent;
let sidebarReal;
let sidebarSimbolico;
let sidebarHistoria;
let blueprintSections;
let addSectionBtn;
let mainWritingArea;

let autoSaveTimer;
let currentSeed = '';
let blueprintSectionsData = [];

// ==========================================
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - inicializando aplicación');
    
    // Obtener elementos existentes
    songTitleInput = document.getElementById('songTitle');
    lyricsEditor = document.getElementById('lyricsEditor');
    lineCountElement = document.getElementById('lineCount');
    wordCountElement = document.getElementById('wordCount');
    saveIndicator = document.getElementById('saveIndicator');
    toggleConceptBtn = document.getElementById('toggleConceptBtn');
    conceptPanel = document.getElementById('conceptPanel');
    conceptQueTextarea = document.getElementById('conceptQue');
    conceptQuienTextarea = document.getElementById('conceptQuien');
    conceptParaQueTextarea = document.getElementById('conceptParaQue');
    conceptComoTextarea = document.getElementById('conceptComo');
    
    // Obtener elementos del panel de preguntas
    toggleQuestionsBtn = document.getElementById('toggleQuestionsBtn');
    questionsPanel = document.getElementById('questionsPanel');
    questionsTextarea = document.getElementById('questionsTextarea');
    
    // Obtener elementos del panel de Plan de Semilla
    toggleSeedPlanBtn = document.getElementById('toggleSeedPlanBtn');
    seedPlanPanel = document.getElementById('seedPlanPanel');
    seedPlanSeparator = document.getElementById('seedPlanSeparator');
    
    // NUEVO: Obtener selector de categoría de título
    titleCategorySelect = document.getElementById('titleCategory');
    titleCategoryHint = document.getElementById('titleCategoryHint');
    
    // Obtener elementos del panel de notas
    toggleNotesBtn = document.getElementById('toggleNotesBtn');
    closeNotesBtn = document.getElementById('closeNotesBtn');
    notesPanel = document.getElementById('notesPanel');
    notesOverlay = document.getElementById('notesOverlay');
    notesTabs = document.querySelectorAll('.notes-tab');
    notesTabContents = document.querySelectorAll('.notes-tab-content');
    
    // Obtener todos los textareas de notas
    notesTextareas = {
        ideas: document.getElementById('notesIdeas'),
        semantico: document.getElementById('notesSemantico'),
        sensoriales: document.getElementById('notesSensoriales'),
        metaforas: document.getElementById('notesMetaforas'),
        objetos: document.getElementById('notesObjetos'),
        momentos: document.getElementById('notesMomentos'),
        conflictos: document.getElementById('notesConflictos'),
        preguntas: document.getElementById('notesPreguntas')
    };
    
    // Obtener elementos del flujo Semilla Creativa
    openSeedFlowBtn = document.getElementById('openSeedFlowBtn');
    seedFlowContainer = document.getElementById('seedFlowContainer');
    closeSeedFlow = document.getElementById('closeSeedFlow');
    seedInput = document.getElementById('seedInput');
    exploreIdea = document.getElementById('exploreIdea');
    seedPhase1 = document.getElementById('seedPhase1');
    seedPhase2 = document.getElementById('seedPhase2');
    seedPhase3 = document.getElementById('seedPhase3');
    backToPhase1 = document.getElementById('backToPhase1');
    backToPhase2 = document.getElementById('backToPhase2');
    goToBlueprint = document.getElementById('goToBlueprint');
    finishBlueprint = document.getElementById('finishBlueprint');
    displaySeed = document.getElementById('displaySeed');
    explorationCategories = document.querySelectorAll('.exploration-category');
    questionSets = document.querySelectorAll('.question-set');
    
    // Obtener las 3 secciones de canvas
    seedCanvasReal = document.getElementById('seedCanvasReal');
    seedCanvasSimbolico = document.getElementById('seedCanvasSimbolico');
    seedCanvasHistoria = document.getElementById('seedCanvasHistoria');
    canvasSections = document.querySelectorAll('.canvas-section');
    
    // Obtener elementos del blueprint
    ideasSidebarContent = document.getElementById('ideasSidebarContent');
    sidebarReal = document.getElementById('sidebarReal');
    sidebarSimbolico = document.getElementById('sidebarSimbolico');
    sidebarHistoria = document.getElementById('sidebarHistoria');
    blueprintSections = document.getElementById('blueprintSections');
    addSectionBtn = document.getElementById('addSection');
    mainWritingArea = document.getElementById('mainWritingArea');
    
    // Verificar elementos críticos
    if (!toggleConceptBtn || !conceptPanel) {
        console.error('ERROR: Elementos del concepto no encontrados');
        return;
    }
    
    if (!toggleQuestionsBtn || !questionsPanel || !questionsTextarea) {
        console.error('ERROR: Elementos de preguntas no encontrados');
        return;
    }
    
    if (!toggleNotesBtn || !notesPanel) {
        console.error('ERROR: Elementos de notas no encontrados');
        return;
    }
    
    if (!conceptComoTextarea) {
        console.error('ERROR: Campo CÓMO no encontrado');
        return;
    }
    
    if (!openSeedFlowBtn || !seedFlowContainer) {
        console.error('ERROR: Elementos de Semilla Creativa no encontrados');
        return;
    }
    
    if (!seedCanvasReal || !seedCanvasSimbolico || !seedCanvasHistoria) {
        console.error('ERROR: Canvas de ideas no encontrados');
        return;
    }
    
    console.log('Todos los elementos encontrados correctamente');
    
    // Configurar event listeners
    setupEventListeners();
    
    // Cargar datos guardados
    loadSavedData();
    
    // Inicializar blueprint con secciones por defecto
    initializeBlueprint();
    
    console.log('Aplicación inicializada correctamente');
});

// ==========================================
// CONFIGURAR EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Botón de toggle del concepto
    toggleConceptBtn.addEventListener('click', toggleConceptPanel);
    
    // Botón de toggle de preguntas
    toggleQuestionsBtn.addEventListener('click', toggleQuestionsPanel);
    
    // Botón de toggle de Plan de Semilla
    if (toggleSeedPlanBtn) {
        toggleSeedPlanBtn.addEventListener('click', toggleSeedPlanPanel);
    }
    
    // Botones para abrir/cerrar notas
    toggleNotesBtn.addEventListener('click', openNotesPanel);
    closeNotesBtn.addEventListener('click', closeNotesPanel);
    notesOverlay.addEventListener('click', closeNotesPanel);
    
    // Event listeners para las pestañas
    notesTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchNotesTab(tabName);
        });
    });
    
    // Event listeners para todos los textareas de notas
    Object.keys(notesTextareas).forEach(function(key) {
        notesTextareas[key].addEventListener('input', scheduleAutoSave);
    });
    
    // Editor de letra
    lyricsEditor.addEventListener('input', function() {
        updateStats();
        scheduleAutoSave();
    });
    
    // Título de canción
    songTitleInput.addEventListener('input', scheduleAutoSave);
    
    // NUEVO: Listener para categoría de título
    if (titleCategorySelect) {
        titleCategorySelect.addEventListener('change', function() {
            updateTitleCategoryHint();
            scheduleAutoSave();
        });
    }
    
    // Campos de concepto
    conceptQueTextarea.addEventListener('input', scheduleAutoSave);
    conceptQuienTextarea.addEventListener('input', scheduleAutoSave);
    conceptParaQueTextarea.addEventListener('input', scheduleAutoSave);
    conceptComoTextarea.addEventListener('input', scheduleAutoSave);
    
    // Campo de preguntas
    questionsTextarea.addEventListener('input', scheduleAutoSave);
    
    // Event listeners para Semilla Creativa
    openSeedFlowBtn.addEventListener('click', openSeedFlow);
    closeSeedFlow.addEventListener('click', closeSeedFlowHandler);
    exploreIdea.addEventListener('click', goToPhase2);
    backToPhase1.addEventListener('click', showPhase1);
    goToBlueprint.addEventListener('click', goToPhase3);
    backToPhase2.addEventListener('click', showPhase2);
    finishBlueprint.addEventListener('click', completeSeedFlow);
    addSectionBtn.addEventListener('click', addBlueprintSection);
    
    // Habilitar/deshabilitar botón según input
    seedInput.addEventListener('input', function() {
        exploreIdea.disabled = !seedInput.value.trim();
    });
    
    // Categorías de exploración
    explorationCategories.forEach(function(category) {
        category.addEventListener('click', function() {
            switchExplorationCategory(this.getAttribute('data-category'));
        });
    });
    
    // Canvas de ideas - auto-save
    seedCanvasReal.addEventListener('input', scheduleAutoSave);
    seedCanvasSimbolico.addEventListener('input', scheduleAutoSave);
    seedCanvasHistoria.addEventListener('input', scheduleAutoSave);
    
    // Guardar con Ctrl+S
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveData();
        }
        
        // Cerrar notas con ESC
        if (e.key === 'Escape' && notesPanel.classList.contains('active')) {
            closeNotesPanel();
        }
    });
    
    // Guardar antes de cerrar
    window.addEventListener('beforeunload', saveData);
    
    console.log('Event listeners configurados');
}

// ==========================================
// MOSTRAR/OCULTAR PANELES
// ==========================================
function toggleConceptPanel() {
    if (conceptPanel.style.display === 'none') {
        conceptPanel.style.display = 'block';
        localStorage.setItem('conceptPanelVisible', 'true');
    } else {
        conceptPanel.style.display = 'none';
        localStorage.setItem('conceptPanelVisible', 'false');
    }
}

function toggleQuestionsPanel() {
    if (questionsPanel.style.display === 'none') {
        questionsPanel.style.display = 'block';
        localStorage.setItem('questionsPanelVisible', 'true');
    } else {
        questionsPanel.style.display = 'none';
        localStorage.setItem('questionsPanelVisible', 'false');
    }
}

function toggleSeedPlanPanel() {
    if (seedPlanPanel.style.display === 'none') {
        seedPlanPanel.style.display = 'block';
        localStorage.setItem('seedPlanPanelVisible', 'true');
    } else {
        seedPlanPanel.style.display = 'none';
        localStorage.setItem('seedPlanPanelVisible', 'false');
    }
}

function openNotesPanel() {
    notesPanel.classList.add('active');
    notesOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNotesPanel() {
    notesPanel.classList.remove('active');
    notesOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function switchNotesTab(tabName) {
    notesTabs.forEach(function(tab) {
        tab.classList.remove('active');
    });
    
    notesTabContents.forEach(function(content) {
        content.classList.remove('active');
    });
    
    const selectedTab = document.querySelector('.notes-tab[data-tab="' + tabName + '"]');
    const selectedContent = document.querySelector('.notes-tab-content[data-content="' + tabName + '"]');
    
    if (selectedTab && selectedContent) {
        selectedTab.classList.add('active');
        selectedContent.classList.add('active');
    }
}

// ==========================================
// FLUJO SEMILLA CREATIVA
// ==========================================
function openSeedFlow() {
    seedFlowContainer.style.display = 'block';
    mainWritingArea.style.display = 'none';
    showPhase1();
    console.log('Flujo Semilla Creativa abierto');
}

function closeSeedFlowHandler() {
    seedFlowContainer.style.display = 'none';
    mainWritingArea.style.display = 'flex';
    console.log('Flujo Semilla Creativa cerrado');
}

function showPhase1() {
    seedPhase1.style.display = 'flex';
    seedPhase2.style.display = 'none';
    seedPhase3.style.display = 'none';
}

function goToPhase2() {
    const seed = seedInput.value.trim();
    if (!seed) {
        alert('Por favor escribe una palabra o idea para continuar');
        return;
    }
    
    currentSeed = seed;
    displaySeed.textContent = seed;
    
    seedPhase1.style.display = 'none';
    seedPhase2.style.display = 'flex';
    seedPhase3.style.display = 'none';
    
    localStorage.setItem('seedCurrent', currentSeed);
    console.log('Avanzando a Fase 2 con semilla:', currentSeed);
}

function showPhase2() {
    seedPhase1.style.display = 'none';
    seedPhase2.style.display = 'flex';
    seedPhase3.style.display = 'none';
}

function goToPhase3() {
    sidebarReal.textContent = seedCanvasReal.value;
    sidebarSimbolico.textContent = seedCanvasSimbolico.value;
    sidebarHistoria.textContent = seedCanvasHistoria.value;
    
    seedPhase1.style.display = 'none';
    seedPhase2.style.display = 'none';
    seedPhase3.style.display = 'flex';
    
    console.log('Avanzando a Fase 3 - Blueprint');
}

function switchExplorationCategory(category) {
    explorationCategories.forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector('.exploration-category[data-category="' + category + '"]');
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    questionSets.forEach(function(set) {
        set.classList.remove('active');
    });
    
    const activeSet = document.querySelector('.question-set[data-set="' + category + '"]');
    if (activeSet) {
        activeSet.classList.add('active');
    }
    
    canvasSections.forEach(function(section) {
        section.classList.remove('active');
    });
    
    const activeSection = document.querySelector('.canvas-section-' + category);
    if (activeSection) {
        activeSection.classList.add('active');
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function initializeBlueprint() {
    blueprintSectionsData = [
        { title: 'VERSO 1', what: '', how: '' },
        { title: 'PRE-CORO', what: '', how: '' },
        { title: 'CORO', what: '', how: '' },
        { title: 'VERSO 2', what: '', how: '' },
        { title: 'CORO', what: '', how: '' },
        { title: 'PUENTE', what: '', how: '' },
        { title: 'CORO FINAL', what: '', how: '' }
    ];
    renderBlueprintSections();
}

function renderBlueprintSections() {
    blueprintSections.innerHTML = '';
    
    blueprintSectionsData.forEach(function(section, index) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'blueprint-section';
        sectionDiv.setAttribute('data-index', index);
        
        sectionDiv.innerHTML = `
            <div class="section-header">
                <input 
                    type="text" 
                    class="section-title-input" 
                    value="${section.title}"
                    data-index="${index}"
                >
                <div class="section-controls">
                    <button class="remove-section-btn" data-index="${index}">✕ Eliminar</button>
                </div>
            </div>
            <div class="section-field">
                <label class="section-field-label">¿Qué voy a contar?</label>
                <textarea 
                    class="section-field-textarea what-field"
                    data-index="${index}"
                    placeholder="Describe qué sucede en esta sección..."
                >${section.what}</textarea>
            </div>
            <div class="section-field">
                <label class="section-field-label">¿Cómo lo voy a lograr?</label>
                <textarea 
                    class="section-field-textarea how-field"
                    data-index="${index}"
                    placeholder="Describe cómo lo expresarás (recursos, metáforas, tono)..."
                >${section.how}</textarea>
            </div>
        `;
        
        blueprintSections.appendChild(sectionDiv);
    });
    
    attachBlueprintListeners();
}

function attachBlueprintListeners() {
    const titleInputs = document.querySelectorAll('.section-title-input');
    titleInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const index = parseInt(this.getAttribute('data-index'));
            blueprintSectionsData[index].title = this.value;
            scheduleAutoSave();
        });
    });
    
    const whatFields = document.querySelectorAll('.what-field');
    whatFields.forEach(function(field) {
        field.addEventListener('input', function() {
            const index = parseInt(this.getAttribute('data-index'));
            blueprintSectionsData[index].what = this.value;
            scheduleAutoSave();
        });
    });
    
    const howFields = document.querySelectorAll('.how-field');
    howFields.forEach(function(field) {
        field.addEventListener('input', function() {
            const index = parseInt(this.getAttribute('data-index'));
            blueprintSectionsData[index].how = this.value;
            scheduleAutoSave();
        });
    });
    
    const removeButtons = document.querySelectorAll('.remove-section-btn');
    removeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeBlueprintSection(index);
        });
    });
}

function addBlueprintSection() {
    blueprintSectionsData.push({
        title: 'NUEVA SECCIÓN',
        what: '',
        how: ''
    });
    renderBlueprintSections();
    scheduleAutoSave();
}

function removeBlueprintSection(index) {
    if (blueprintSectionsData.length <= 1) {
        alert('Debe haber al menos una sección');
        return;
    }
    
    blueprintSectionsData.splice(index, 1);
    renderBlueprintSections();
    scheduleAutoSave();
}

function completeSeedFlow() {
    saveData();
    populateSeedPlanPanel();
    
    if (toggleSeedPlanBtn && seedPlanSeparator) {
        toggleSeedPlanBtn.style.display = 'inline-block';
        seedPlanSeparator.style.display = 'inline';
    }
    
    closeSeedFlowHandler();
    
    seedPlanPanel.style.display = 'block';
    localStorage.setItem('seedPlanPanelVisible', 'true');
    
    alert('¡Plan de Semilla completado! Ahora puedes consultarlo mientras escribes tu canción usando el botón "🌱 Mi Plan"');
    
    console.log('Flujo de Semilla completado');
}

function populateSeedPlanPanel() {
    const savedSeedDisplay = document.getElementById('savedSeedDisplay');
    if (savedSeedDisplay) {
        savedSeedDisplay.textContent = currentSeed;
    }
    
    const savedIdeasReal = document.getElementById('savedIdeasReal');
    const savedIdeasSimbolico = document.getElementById('savedIdeasSimbolico');
    const savedIdeasHistoria = document.getElementById('savedIdeasHistoria');
    
    if (savedIdeasReal) {
        savedIdeasReal.textContent = seedCanvasReal.value || 'Sin contenido';
    }
    
    if (savedIdeasSimbolico) {
        savedIdeasSimbolico.textContent = seedCanvasSimbolico.value || 'Sin contenido';
    }
    
    if (savedIdeasHistoria) {
        savedIdeasHistoria.textContent = seedCanvasHistoria.value || 'Sin contenido';
    }
    
    const savedBlueprintDisplay = document.getElementById('savedBlueprintDisplay');
    if (savedBlueprintDisplay) {
        savedBlueprintDisplay.innerHTML = '';
        
        blueprintSectionsData.forEach(function(section) {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'blueprint-saved-section';
            
            sectionDiv.innerHTML = `
                <h4 class="blueprint-saved-title">${section.title}</h4>
                <div class="blueprint-saved-field">
                    <div class="blueprint-saved-label">¿Qué voy a contar?</div>
                    <div class="blueprint-saved-text">${section.what || 'Sin definir'}</div>
                </div>
                <div class="blueprint-saved-field">
                    <div class="blueprint-saved-label">¿Cómo lo voy a lograr?</div>
                    <div class="blueprint-saved-text">${section.how || 'Sin definir'}</div>
                </div>
            `;
            
            savedBlueprintDisplay.appendChild(sectionDiv);
        });
    }
}

// ==========================================
// CARGAR DATOS GUARDADOS
// ==========================================
function loadSavedData() {
    const savedTitle = localStorage.getItem('songTitle');
    const savedLyrics = localStorage.getItem('songLyrics');
    
    if (savedTitle) {
        songTitleInput.value = savedTitle;
    }
    
    if (savedLyrics) {
        lyricsEditor.textContent = savedLyrics;
    }
    
    // NUEVO: Cargar categoría de título
    const savedTitleCategory = localStorage.getItem('titleCategory');
    if (savedTitleCategory && titleCategorySelect) {
        titleCategorySelect.value = savedTitleCategory;
        updateTitleCategoryHint();
    }
    
    const savedConceptQue = localStorage.getItem('conceptQue');
    const savedConceptQuien = localStorage.getItem('conceptQuien');
    const savedConceptParaQue = localStorage.getItem('conceptParaQue');
    const savedConceptComo = localStorage.getItem('conceptComo');
    
    if (savedConceptQue) conceptQueTextarea.value = savedConceptQue;
    if (savedConceptQuien) conceptQuienTextarea.value = savedConceptQuien;
    if (savedConceptParaQue) conceptParaQueTextarea.value = savedConceptParaQue;
    if (savedConceptComo) conceptComoTextarea.value = savedConceptComo;
    
    const savedQuestions = localStorage.getItem('songQuestions');
    if (savedQuestions) {
        questionsTextarea.value = savedQuestions;
    }
    
    const conceptPanelState = localStorage.getItem('conceptPanelVisible');
    if (conceptPanelState === 'true') {
        conceptPanel.style.display = 'block';
    }
    
    const questionsPanelState = localStorage.getItem('questionsPanelVisible');
    if (questionsPanelState === 'true') {
        questionsPanel.style.display = 'block';
    }
    
    Object.keys(notesTextareas).forEach(function(key) {
        const savedNote = localStorage.getItem('notes_' + key);
        if (savedNote) {
            notesTextareas[key].value = savedNote;
        }
    });
    
    const savedSeed = localStorage.getItem('seedCurrent');
    const savedCanvasReal = localStorage.getItem('seedCanvasReal');
    const savedCanvasSimbolico = localStorage.getItem('seedCanvasSimbolico');
    const savedCanvasHistoria = localStorage.getItem('seedCanvasHistoria');
    const savedBlueprint = localStorage.getItem('seedBlueprint');
    const hasSeedPlan = localStorage.getItem('hasSeedPlan');
    
    if (savedSeed) {
        currentSeed = savedSeed;
        seedInput.value = savedSeed;
        displaySeed.textContent = savedSeed;
    }
    
    if (savedCanvasReal) seedCanvasReal.value = savedCanvasReal;
    if (savedCanvasSimbolico) seedCanvasSimbolico.value = savedCanvasSimbolico;
    if (savedCanvasHistoria) seedCanvasHistoria.value = savedCanvasHistoria;
    
    if (savedBlueprint) {
        try {
            blueprintSectionsData = JSON.parse(savedBlueprint);
            renderBlueprintSections();
        } catch (e) {
            console.error('Error cargando blueprint:', e);
        }
    }
    
    if (hasSeedPlan === 'true') {
        if (toggleSeedPlanBtn && seedPlanSeparator) {
            toggleSeedPlanBtn.style.display = 'inline-block';
            seedPlanSeparator.style.display = 'inline';
        }
        populateSeedPlanPanel();
        
        const seedPlanPanelState = localStorage.getItem('seedPlanPanelVisible');
        if (seedPlanPanelState === 'true') {
            seedPlanPanel.style.display = 'block';
        }
    }
    
    updateStats();
    
    console.log('Datos cargados desde localStorage');
}

// ==========================================
// GUARDAR DATOS
// ==========================================
function saveData() {
    localStorage.setItem('songTitle', songTitleInput.value);
    localStorage.setItem('songLyrics', lyricsEditor.textContent);
    
    // NUEVO: Guardar categoría de título
    if (titleCategorySelect) {
        localStorage.setItem('titleCategory', titleCategorySelect.value);
    }
    
    localStorage.setItem('conceptQue', conceptQueTextarea.value);
    localStorage.setItem('conceptQuien', conceptQuienTextarea.value);
    localStorage.setItem('conceptParaQue', conceptParaQueTextarea.value);
    localStorage.setItem('conceptComo', conceptComoTextarea.value);
    localStorage.setItem('songQuestions', questionsTextarea.value);
    
    Object.keys(notesTextareas).forEach(function(key) {
        localStorage.setItem('notes_' + key, notesTextareas[key].value);
    });
    
    localStorage.setItem('seedCurrent', currentSeed);
    localStorage.setItem('seedCanvasReal', seedCanvasReal.value);
    localStorage.setItem('seedCanvasSimbolico', seedCanvasSimbolico.value);
    localStorage.setItem('seedCanvasHistoria', seedCanvasHistoria.value);
    localStorage.setItem('seedBlueprint', JSON.stringify(blueprintSectionsData));
    
    if (currentSeed || seedCanvasReal.value || seedCanvasSimbolico.value || seedCanvasHistoria.value) {
        localStorage.setItem('hasSeedPlan', 'true');
    }
    
    showSaveIndicator();
    console.log('Datos guardados');
}

// ==========================================
// MOSTRAR INDICADOR DE GUARDADO
// ==========================================
function showSaveIndicator() {
    saveIndicator.classList.add('show');
    setTimeout(function() {
        saveIndicator.classList.remove('show');
    }, 2000);
}

// ==========================================
// ACTUALIZAR ESTADÍSTICAS
// ==========================================
function updateStats() {
    const text = lyricsEditor.textContent.trim();
    
    const lines = text ? text.split('\n').length : 0;
    lineCountElement.textContent = lines + (lines === 1 ? ' línea' : ' líneas');
    
    const words = text ? text.split(/\s+/).filter(function(word) {
        return word.length > 0;
    }).length : 0;
    wordCountElement.textContent = words + (words === 1 ? ' palabra' : ' palabras');
}

// ==========================================
// PROGRAMAR AUTO-GUARDADO
// ==========================================
function scheduleAutoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(function() {
        saveData();
    }, 3000);
}

// ==========================================
// NUEVO: ACTUALIZAR HINT DE CATEGORÍA DE TÍTULO
// ==========================================
function updateTitleCategoryHint() {
    const category = titleCategorySelect.value;
    
    const hints = {
        'momentos': '<strong>Momentos:</strong> Ej: "3 AM", "El último verano", "Cuando me miraste", "Ese diciembre"',
        'lugares': '<strong>Lugares:</strong> Ej: "París bajo la lluvia", "Tu habitación", "El bar de la esquina", "Donde nos conocimos"',
        'nombres': '<strong>Nombres:</strong> Ej: "María", "El señor de los anillos", "Ana y Pedro", "La chica del vestido rojo"',
        'colores': '<strong>Colores:</strong> Ej: "Azul", "Gris sobre gris", "Noche negra", "Verde esperanza"',
        'palabras': '<strong>Palabras Aisladas:</strong> Ej: "Vértigo", "Deseo", "Fuego", "Nostalgia"',
        'opuestos': '<strong>Opuestos:</strong> Ej: "Amor y odio", "Todo o nada", "Cerca y lejos", "Luz en la oscuridad"',
        'expresiones': '<strong>Expresiones Populares:</strong> Ej: "Como Pedro por su casa", "A contracorriente", "De tal palo tal astilla"',
        'avisos': '<strong>Avisos y Carteles:</strong> Ej: "Prohibido el paso", "Se vende corazón", "Salida de emergencia", "Fuera de servicio"',
        'conversaciones': '<strong>Conversaciones:</strong> Ej: "¿Me quieres?", "No vuelvas", "Te lo dije", "Quédate conmigo"',
        'juegos': '<strong>Juegos de Palabras:</strong> Ej: "Amor-daza", "Desamor-dazado", "In-cierto", "Des-encuentro"',
        'reciclados': '<strong>Títulos Reciclados:</strong> Ej: "Como agua para chocolate", "La vida es bella", "Eterno resplandor"'
    };
    
    if (category && hints[category]) {
        titleCategoryHint.innerHTML = hints[category];
        titleCategoryHint.style.display = 'block';
    } else {
        titleCategoryHint.style.display = 'none';
    }
}
