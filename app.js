// Application data
const appData = {
  "interest_rates": [
    {"currency": "USD", "cb_rate": 4.375, "interbank": 4.35, "change_bps": -25, "volatility": "Medium", "policy_change": "Rate Cut Dec 2024"},
    {"currency": "EUR", "cb_rate": 2.25, "interbank": 1.984, "change_bps": -25, "volatility": "Low", "policy_change": "Rate Cut Apr 2025"},
    {"currency": "JPY", "cb_rate": 0.5, "interbank": 0.477, "change_bps": 0, "volatility": "Low", "policy_change": "Hold May 2025"},
    {"currency": "GBP", "cb_rate": 4.25, "interbank": 4.2, "change_bps": -25, "volatility": "Medium", "policy_change": "Rate Cut May 2025"},
    {"currency": "CHF", "cb_rate": 0.25, "interbank": 0.3, "change_bps": -25, "volatility": "Low", "policy_change": "Rate Cut Mar 2025"},
    {"currency": "AUD", "cb_rate": 3.85, "interbank": 3.8, "change_bps": -25, "volatility": "Medium", "policy_change": "Rate Cut May 2025"},
    {"currency": "NZD", "cb_rate": 3.25, "interbank": 3.2, "change_bps": -25, "volatility": "Medium", "policy_change": "Rate Cut May 2025"},
    {"currency": "CAD", "cb_rate": 2.75, "interbank": 2.7, "change_bps": -25, "volatility": "Low", "policy_change": "Rate Cut Mar 2025"},
    {"currency": "BRL", "cb_rate": 14.75, "interbank": 14.5, "change_bps": 50, "volatility": "High", "policy_change": "Rate Hike May 2025"},
    {"currency": "TRY", "cb_rate": 46.0, "interbank": 45.5, "change_bps": 350, "volatility": "Extreme", "policy_change": "Surprise Hike Apr 2025"},
    {"currency": "MXN", "cb_rate": 9.5, "interbank": 9.3, "change_bps": -50, "volatility": "High", "policy_change": "Rate Cut Feb 2025"},
    {"currency": "ZAR", "cb_rate": 7.25, "interbank": 7.1, "change_bps": -25, "volatility": "Medium", "policy_change": "Rate Cut May 2025"},
    {"currency": "INR", "cb_rate": 6.0, "interbank": 5.9, "change_bps": -25, "volatility": "Medium", "policy_change": "Rate Cut Apr 2025"},
    {"currency": "CNY", "cb_rate": 3.0, "interbank": 2.9, "change_bps": -10, "volatility": "Low", "policy_change": "Rate Cut May 2025"}
  ],
  "carry_pairs": [
    {"pair": "TRY/CHF", "long": "TRY", "short": "CHF", "spread": 45.75, "carry_return": 45.75, "volatility": 25.4, "sharpe": 180.21},
    {"pair": "TRY/JPY", "long": "TRY", "short": "JPY", "spread": 45.50, "carry_return": 45.50, "volatility": 25.4, "sharpe": 179.23},
    {"pair": "TRY/EUR", "long": "TRY", "short": "EUR", "spread": 43.75, "carry_return": 43.75, "volatility": 25.4, "sharpe": 172.33},
    {"pair": "TRY/CAD", "long": "TRY", "short": "CAD", "spread": 43.25, "carry_return": 43.25, "volatility": 25.4, "sharpe": 170.36},
    {"pair": "TRY/CNY", "long": "TRY", "short": "CNY", "spread": 43.00, "carry_return": 43.00, "volatility": 25.4, "sharpe": 169.38},
    {"pair": "BRL/CHF", "long": "BRL", "short": "CHF", "spread": 14.50, "carry_return": 14.50, "volatility": 13.9, "sharpe": 104.10},
    {"pair": "BRL/JPY", "long": "BRL", "short": "JPY", "spread": 14.25, "carry_return": 14.25, "volatility": 13.9, "sharpe": 102.31},
    {"pair": "MXN/CHF", "long": "MXN", "short": "CHF", "spread": 9.25, "carry_return": 9.25, "volatility": 13.4, "sharpe": 68.91},
    {"pair": "MXN/JPY", "long": "MXN", "short": "JPY", "spread": 9.00, "carry_return": 9.00, "volatility": 13.4, "sharpe": 67.05},
    {"pair": "ZAR/CHF", "long": "ZAR", "short": "CHF", "spread": 7.00, "carry_return": 7.00, "volatility": 8.5, "sharpe": 82.35}
  ],
  "macro_indicators": {
    "vix": 19.30,
    "dxy": 98.90,
    "us_2y10y_spread": 0.52,
    "regime": "Neutral / Mixed Signals",
    "regime_description": "Moderate volatility environment with carry-friendly conditions but ongoing policy uncertainty"
  },
  "historical_data": {
    "sample_backtest": {
      "pair": "BRL/JPY",
      "periods": {
        "3M": {"return": 3.2, "volatility": 12.1, "sharpe": 0.26, "max_drawdown": -2.1},
        "6M": {"return": 6.8, "volatility": 13.5, "sharpe": 0.50, "max_drawdown": -4.3},
        "1Y": {"return": 12.1, "volatility": 14.2, "sharpe": 0.85, "max_drawdown": -6.7}
      }
    }
  },
  "last_updated": "June 3, 2025, 18:58 CEST"
};

// Utility functions
function formatPercentage(value, decimals = 2) {
    return `${value.toFixed(decimals)}%`;
}

function formatBasisPoints(value) {
    return value > 0 ? `+${value}` : `${value}`;
}

function getVolatilityClass(volatility) {
    switch(volatility.toLowerCase()) {
        case 'extreme': return 'volatility-extreme';
        case 'high': return 'volatility-high';
        case 'medium': return 'volatility-medium';
        case 'low': return 'volatility-low';
        default: return '';
    }
}

function getChangeClass(change) {
    if (change > 0) return 'rate-hike';
    if (change < 0) return 'rate-cut';
    return 'rate-hold';
}

function isG10Currency(currency) {
    const g10 = ['USD', 'EUR', 'JPY', 'GBP', 'CHF', 'AUD', 'NZD', 'CAD'];
    return g10.includes(currency);
}

function isEMCurrency(currency) {
    const em = ['BRL', 'TRY', 'MXN', 'ZAR', 'INR', 'CNY'];
    return em.includes(currency);
}

// Table sorting functionality
function sortTable(table, column, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        let aVal = a.querySelector(`[data-value="${column}"]`);
        let bVal = b.querySelector(`[data-value="${column}"]`);
        
        if (!aVal || !bVal) return 0;
        
        aVal = aVal.dataset.value || aVal.textContent;
        bVal = bVal.dataset.value || bVal.textContent;
        
        // Try to parse as numbers
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // String comparison
        return direction === 'asc' ? 
            aVal.localeCompare(bVal) : 
            bVal.localeCompare(aVal);
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

// Initialize tables
function initializeRatesTable() {
    const tbody = document.getElementById('rates-tbody');
    tbody.innerHTML = '';
    
    appData.interest_rates.forEach(rate => {
        const row = document.createElement('tr');
        
        // Apply styling for extreme rates
        let currencyClass = '';
        if (rate.cb_rate >= 20) currencyClass = 'extreme-high';
        else if (rate.cb_rate <= 1) currencyClass = 'extreme-low';
        
        row.innerHTML = `
            <td data-value="${rate.currency}" class="${currencyClass}">
                <strong>${rate.currency}</strong>
            </td>
            <td data-value="${rate.cb_rate}" class="${currencyClass}">
                ${formatPercentage(rate.cb_rate)}
            </td>
            <td data-value="${rate.interbank}">
                ${formatPercentage(rate.interbank)}
            </td>
            <td data-value="${rate.change_bps}" class="${getChangeClass(rate.change_bps)}">
                ${formatBasisPoints(rate.change_bps)} bps
            </td>
            <td data-value="${rate.volatility}" class="${getVolatilityClass(rate.volatility)}">
                ${rate.volatility}
            </td>
            <td data-value="${rate.policy_change}">
                ${rate.policy_change}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function initializeCarryPairsTable() {
    const tbody = document.getElementById('pairs-tbody');
    updateCarryPairsTable();
}

function updateCarryPairsTable() {
    const tbody = document.getElementById('pairs-tbody');
    const volatilityFilter = parseFloat(document.getElementById('volatility-filter').value);
    const regionFilter = document.getElementById('region-filter').value;
    
    let filteredPairs = appData.carry_pairs.filter(pair => {
        // Volatility filter
        if (pair.volatility > volatilityFilter) return false;
        
        // Region filter
        if (regionFilter === 'g10') {
            return isG10Currency(pair.long) && isG10Currency(pair.short);
        } else if (regionFilter === 'em') {
            return isEMCurrency(pair.long) || isEMCurrency(pair.short);
        }
        
        return true;
    });
    
    tbody.innerHTML = '';
    
    filteredPairs.forEach((pair, index) => {
        const row = document.createElement('tr');
        
        // Highlight top 5 pairs
        let rowClass = '';
        if (index < 5) rowClass = 'top-pair';
        if (pair.volatility > 25) rowClass = 'extreme-risk';
        
        row.className = rowClass;
        
        row.innerHTML = `
            <td data-value="${pair.pair}">
                <strong>${pair.pair}</strong>
                ${pair.volatility > 25 ? '<span class="status status--error">⚠ High Risk</span>' : ''}
            </td>
            <td data-value="${pair.long}">${pair.long}</td>
            <td data-value="${pair.short}">${pair.short}</td>
            <td data-value="${pair.spread}">${formatPercentage(pair.spread)}</td>
            <td data-value="${pair.carry_return}">${formatPercentage(pair.carry_return)}</td>
            <td data-value="${pair.volatility}">${formatPercentage(pair.volatility)}</td>
            <td data-value="${pair.sharpe}">${pair.sharpe.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Backtest functionality
function updateBacktestResults() {
    const selectedPair = document.getElementById('pair-selector').value;
    const selectedPeriod = document.getElementById('period-selector').value;
    
    // Use sample data for demonstration
    const sampleData = appData.historical_data.sample_backtest.periods;
    const data = sampleData[selectedPeriod] || sampleData['1Y'];
    
    document.getElementById('total-return').textContent = formatPercentage(data.return);
    document.getElementById('total-return').className = `metric-value ${data.return > 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('volatility-metric').textContent = formatPercentage(data.volatility);
    document.getElementById('sharpe-metric').textContent = data.sharpe.toFixed(2);
    document.getElementById('max-drawdown').textContent = formatPercentage(data.max_drawdown);
}

// Chat functionality
const chatResponses = {
    "Which currency pair has the highest yield differential with low volatility?": 
        "Based on current data, ZAR/CHF offers an attractive 7.00% spread with moderate 8.5% volatility, providing a solid risk-adjusted return of 82.35. For even lower volatility, consider BRL/JPY with 14.25% spread and 13.9% volatility.",
    
    "How did the TRY/JPY carry trade perform in 2024?": 
        "TRY/JPY has been extremely volatile due to Turkey's aggressive monetary policy. While offering the highest spreads (45.50%), the 25.4% volatility creates significant risk. Historical performance would show high returns but substantial drawdowns during risk-off periods.",
    
    "What are the main risks for carry trades in the current environment?": 
        "Key risks include: 1) Central bank policy reversals 2) Risk-off sentiment (VIX currently at 19.30 - moderate) 3) Currency volatility spikes 4) Geopolitical events. The current 'Neutral/Mixed Signals' regime suggests caution with high-volatility pairs.",
    
    "Should I avoid high-volatility emerging market pairs?": 
        "While EM pairs like TRY/JPY offer high spreads, their extreme volatility (>25%) makes them suitable only for experienced traders with strong risk management. Consider limiting exposure to <5% of portfolio and using stop-losses."
};

function addChatMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'assistant'}`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChatInput(question) {
    addChatMessage(question, true);
    
    // Simulate thinking delay
    setTimeout(() => {
        const response = chatResponses[question] || 
            "I understand your question about carry trades. Based on current market conditions and the data shown in the dashboard, I'd recommend focusing on pairs with moderate volatility (8-15%) and positive risk-adjusted returns. Always consider your risk tolerance and current macro environment.";
        
        addChatMessage(response);
    }, 1000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tables
    initializeRatesTable();
    initializeCarryPairsTable();
    updateBacktestResults();
    
    // Table sorting
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', function() {
            const table = this.closest('table');
            const column = this.dataset.column;
            
            // Remove sort classes from other headers
            table.querySelectorAll('.sortable').forEach(header => {
                if (header !== this) {
                    header.classList.remove('sort-asc', 'sort-desc');
                }
            });
            
            // Toggle sort direction
            let direction = 'asc';
            if (this.classList.contains('sort-asc')) {
                direction = 'desc';
                this.classList.remove('sort-asc');
                this.classList.add('sort-desc');
            } else {
                direction = 'asc';
                this.classList.remove('sort-desc');
                this.classList.add('sort-asc');
            }
            
            sortTable(table, column, direction);
        });
    });
    
    // Filter controls
    document.getElementById('volatility-filter').addEventListener('change', updateCarryPairsTable);
    document.getElementById('region-filter').addEventListener('change', updateCarryPairsTable);
    
    // Backtest controls
    document.getElementById('pair-selector').addEventListener('change', updateBacktestResults);
    document.getElementById('period-selector').addEventListener('change', updateBacktestResults);
    
    // Chat functionality
    document.querySelectorAll('.question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.dataset.question;
            handleChatInput(question);
        });
    });
    
    document.getElementById('send-message').addEventListener('click', function() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            handleChatInput(message);
            input.value = '';
        }
    });
    
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('send-message').click();
        }
    });
    
    // Update timestamp
    setInterval(() => {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
        };
        document.getElementById('current-time').textContent = now.toLocaleDateString('en-US', options);
    }, 60000); // Update every minute
});