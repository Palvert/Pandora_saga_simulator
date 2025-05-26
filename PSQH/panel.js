// panel.js - Fixed version that properly filters your table

// DOM Elements
const questTable = document.getElementById('questTable');
const tbody = questTable.querySelector('tbody');
const questTypeRadios = document.querySelectorAll('input[name="questType"]');
const applyButton = document.getElementById('applyFilters');
const createButton = document.getElementById('createCode');
const loadButton = document.getElementById('loadCode');
const saveCodeInput = document.getElementById('saveCode');
const charLevelInput = document.getElementById('charLevel');
const minQuestLevelInput = document.getElementById('minQuestLevel');
const minGoldInput = document.getElementById('minGold');
const minXPInput = document.getElementById('minXP');
const completeButtons = document.querySelectorAll('.complete-btn');
const copyButton = document.getElementById('copyCode');

// Filter state
let currentFilters = {
  questType: 'all',
  charLevel: 1,
  minQuestLevel: 1,
  minGold: 0,
  minXP: 0,
  completedQuests: [] // Initialize empty array
};


// Initialize filters from UI
function updateFilters() {
  // Preserve the completedQuests array while updating other filters
  currentFilters = {
    ...currentFilters, // Keep existing properties (including completedQuests)
    questType: document.querySelector('input[name="questType"]:checked').value,
    charLevel: parseInt(charLevelInput.value) || 1,
    minQuestLevel: parseInt(minQuestLevelInput.value) || 1,
    minGold: parseInt(minGoldInput.value) || 0,
    minXP: parseInt(minXPInput.value) || 0
  };
}

// Apply filters to the table
function applyFilters() {
  const rows = tbody.querySelectorAll('tr');
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    // Get quest type - default to 'S' (Side) if type column is empty
    const questType = cells[6] ? cells[6].textContent.trim() : 'S';
    const lvlMin = parseInt(cells[2].textContent);
    const lvlMax = parseInt(cells[3].textContent);
    const gold = parseInt(cells[4].textContent) || 0;
    const xp = parseInt(cells[5].textContent) || 0;
    
    // Type filter
    const typeMatch = currentFilters.questType === 'all' || 
                     questType === currentFilters.questType;
    
    // Numeric filters
    const levelMatch = lvlMin <= currentFilters.charLevel && 
                      lvlMax >= currentFilters.charLevel;
    const minLevelMatch = lvlMin >= currentFilters.minQuestLevel;
    const goldMatch = gold >= currentFilters.minGold;
    const xpMatch = xp >= currentFilters.minXP;
    
    // Show/hide based on all filters
    if (typeMatch && levelMatch && minLevelMatch && goldMatch && xpMatch) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function initCompletionTracking() {
  tbody.addEventListener('click', function(e) {
    if (e.target.classList.contains('complete-btn')) {
      e.preventDefault();
      e.stopPropagation();
      
      const button = e.target;
      const questName = button.getAttribute('data-quest');
      const row = button.closest('tr');
      const isCompleted = button.classList.toggle('completed');
      
      row.classList.toggle('completed', isCompleted);
      
      // Update completed quests array
      if (isCompleted) {
        if (!currentFilters.completedQuests.includes(questName)) {
          currentFilters.completedQuests.push(questName);
        }
      } else {
        currentFilters.completedQuests = currentFilters.completedQuests.filter(q => q !== questName);
      }
    }
  });
}

// Create save code
function createSaveCode() {
  // No changes needed - it already includes completedQuests
  const saveState = {
    ...currentFilters // Includes all filter properties
  };
  const jsonString = JSON.stringify(saveState);
  const base64Code = btoa(unescape(encodeURIComponent(jsonString)));
  saveCodeInput.value = base64Code;
}

function copySaveCode() {
  const saveCodeInput = document.getElementById('saveCode');
  
  if (!saveCodeInput.value) {
    alert("No save code to copy! Create one first.");
    return;
  }

  // Modern clipboard API approach
  navigator.clipboard.writeText(saveCodeInput.value)
    .then(() => {
      // Visual feedback
      copyButton.textContent = 'Copied!';
      copyButton.classList.add('copied');
      
      // Reset after 2 seconds
      setTimeout(() => {
        copyButton.textContent = 'Copy';
        copyButton.classList.remove('copied');
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      fallbackCopyText(saveCodeInput);
    });
}

// Fallback method for older browsers
function fallbackCopyText(inputElement) {
  inputElement.select();
  inputElement.setSelectionRange(0, 99999);
  
  try {
    document.execCommand('copy');
    copyButton.textContent = 'Copied!';
    copyButton.classList.add('copied');
    setTimeout(() => {
      copyButton.textContent = 'Copy';
      copyButton.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Fallback copy failed: ', err);
    alert("Failed to copy text. Please copy manually.");
  }
}

// Load filters from code
function loadFilters() {
  try {
    const base64Code = saveCodeInput.value.trim();
    if (!base64Code) return;
    
    const jsonString = decodeURIComponent(escape(atob(base64Code)));
    const savedState = JSON.parse(jsonString);
    
    // Update filter values
    document.querySelector(`input[name="questType"][value="${savedState.questType}"]`).checked = true;
    charLevelInput.value = savedState.charLevel;
    minQuestLevelInput.value = savedState.minQuestLevel;
    minGoldInput.value = savedState.minGold;
    minXPInput.value = savedState.minXP;
    
    // Update completed quests in state
    currentFilters.completedQuests = savedState.completedQuests || [];
    
    // Apply filters
    updateFilters();
    applyFilters();
    
    // Force refresh of completion states - this is the critical fix
    setTimeout(() => {
      refreshCompletionStates();
    }, 50);
  } catch (e) {
    alert('Invalid save code!');
    console.error(e);
  }
}

function refreshCompletionStates() {
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const button = row.querySelector('.complete-btn');
    if (!button) return;
    
    const questName = button.getAttribute('data-quest');
    const isCompleted = currentFilters.completedQuests.includes(questName);
    
    // Update button and row appearance
    button.classList.toggle('completed', isCompleted);
    row.classList.toggle('completed', isCompleted);
  });
}

// Event Listeners
questTypeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    updateFilters();
    applyFilters();
  });
});

applyButton.addEventListener('click', () => {
  updateFilters();
  applyFilters();
});

createButton.addEventListener('click', createSaveCode);
loadButton.addEventListener('click', loadFilters);

// Initialize filters - show all rows by default
updateFilters();
// Start with all quests visible
tbody.querySelectorAll('tr').forEach(row => row.style.display = '');

document.addEventListener('DOMContentLoaded', function() {
  updateFilters(); // Initialize filter values
  initCompletionTracking(); // Set up button handlers
  refreshCompletionStates(); // Set initial visual state
  copyButton.addEventListener('click', copySaveCode);
});