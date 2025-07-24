// OpenWeatherMap API配置
const API_KEY = 'YOUR_API_KEY_HERE'; // 请替换为您的API密钥
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// API密钥验证状态
let apiKeyValid = false;

// 中文城市名称映射
const cityNameMap = {
    // 中国主要城市
    '北京': 'Beijing',
    '上海': 'Shanghai',
    '广州': 'Guangzhou',
    '深圳': 'Shenzhen',
    '杭州': 'Hangzhou',
    '南京': 'Nanjing',
    '武汉': 'Wuhan',
    '成都': 'Chengdu',
    '重庆': 'Chongqing',
    '天津': 'Tianjin',
    '西安': 'Xian',
    '苏州': 'Suzhou',
    '青岛': 'Qingdao',
    '郑州': 'Zhengzhou',
    '大连': 'Dalian',
    '宁波': 'Ningbo',
    '厦门': 'Xiamen',
    '福州': 'Fuzhou',
    '沈阳': 'Shenyang',
    '长沙': 'Changsha',
    '哈尔滨': 'Harbin',
    '济南': 'Jinan',
    '石家庄': 'Shijiazhuang',
    '长春': 'Changchun',
    '南昌': 'Nanchang',
    '贵阳': 'Guiyang',
    '昆明': 'Kunming',
    '南宁': 'Nanning',
    '银川': 'Yinchuan',
    '太原': 'Taiyuan',
    '合肥': 'Hefei',
    '呼和浩特': 'Hohhot',
    '乌鲁木齐': 'Urumqi',
    '兰州': 'Lanzhou',
    '西宁': 'Xining',
    '拉萨': 'Lhasa',
    '海口': 'Haikou',
    '三亚': 'Sanya',
    
    // 港澳台
    '香港': 'Hong Kong',
    '澳门': 'Macau',
    '台北': 'Taipei',
    '高雄': 'Kaohsiung',
    
    // 国际城市
    '东京': 'Tokyo',
    '首尔': 'Seoul',
    '新加坡': 'Singapore',
    '曼谷': 'Bangkok',
    '吉隆坡': 'Kuala Lumpur',
    '雅加达': 'Jakarta',
    '马尼拉': 'Manila',
    '河内': 'Hanoi',
    '胡志明市': 'Ho Chi Minh City',
    '金边': 'Phnom Penh',
    '万象': 'Vientiane',
    '仰光': 'Yangon',
    '达卡': 'Dhaka',
    '加德满都': 'Kathmandu',
    '新德里': 'New Delhi',
    '孟买': 'Mumbai',
    '伊斯兰堡': 'Islamabad',
    '卡拉奇': 'Karachi',
    '喀布尔': 'Kabul',
    '德黑兰': 'Tehran',
    '巴格达': 'Baghdad',
    '大马士革': 'Damascus',
    '安卡拉': 'Ankara',
    '伊斯坦布尔': 'Istanbul',
    '开罗': 'Cairo',
    '拉各斯': 'Lagos',
    '约翰内斯堡': 'Johannesburg',
    '开普敦': 'Cape Town',
    '伦敦': 'London',
    '巴黎': 'Paris',
    '柏林': 'Berlin',
    '罗马': 'Rome',
    '马德里': 'Madrid',
    '阿姆斯特丹': 'Amsterdam',
    '布鲁塞尔': 'Brussels',
    '维也纳': 'Vienna',
    '苏黎世': 'Zurich',
    '斯德哥尔摩': 'Stockholm',
    '哥本哈根': 'Copenhagen',
    '奥斯陆': 'Oslo',
    '赫尔辛基': 'Helsinki',
    '华沙': 'Warsaw',
    '布拉格': 'Prague',
    '布达佩斯': 'Budapest',
    '莫斯科': 'Moscow',
    '圣彼得堡': 'Saint Petersburg',
    '纽约': 'New York',
    '洛杉矶': 'Los Angeles',
    '芝加哥': 'Chicago',
    '休斯顿': 'Houston',
    '费城': 'Philadelphia',
    '凤凰城': 'Phoenix',
    '圣安东尼奥': 'San Antonio',
    '圣地亚哥': 'San Diego',
    '达拉斯': 'Dallas',
    '圣何塞': 'San Jose',
    '旧金山': 'San Francisco',
    '西雅图': 'Seattle',
    '华盛顿': 'Washington',
    '波士顿': 'Boston',
    '拉斯维加斯': 'Las Vegas',
    '迈阿密': 'Miami',
    '多伦多': 'Toronto',
    '温哥华': 'Vancouver',
    '蒙特利尔': 'Montreal',
    '墨西哥城': 'Mexico City',
    '布宜诺斯艾利斯': 'Buenos Aires',
    '圣保罗': 'Sao Paulo',
    '里约热内卢': 'Rio de Janeiro',
    '利马': 'Lima',
    '波哥大': 'Bogota',
    '悉尼': 'Sydney',
    '墨尔本': 'Melbourne',
    '布里斯班': 'Brisbane',
    '珀斯': 'Perth',
    '奥克兰': 'Auckland',
    '惠灵顿': 'Wellington'
};

// 城市名称转换函数
function convertCityName(cityName) {
    const trimmedName = cityName.trim();
    // 如果是中文城市名，转换为英文
    if (cityNameMap[trimmedName]) {
        return cityNameMap[trimmedName];
    }
    // 否则直接返回原名称
    return trimmedName;
}

// DOM元素
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const weatherCard = document.getElementById('weatherCard');
const forecastSection = document.getElementById('forecastSection');
const errorMessage = document.getElementById('errorMessage');

// 天气图标映射
const weatherIcons = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain',
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain',
    '10n': 'fas fa-cloud-moon-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog'
};

// 事件监听器
searchBtn.addEventListener('click', handleSearch);
locationBtn.addEventListener('click', getCurrentLocation);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// 搜索处理函数
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('请输入城市名称');
        return;
    }
    
    await getWeatherData(city);
}

// 获取当前位置
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('您的浏览器不支持地理定位功能');
        return;
    }
    
    // 检查是否为HTTPS环境
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        showError('地理定位功能需要在HTTPS环境下使用，或者在本地环境(localhost)下测试');
        return;
    }
    
    showLoading();
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5分钟缓存
    };
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            console.log('获取到位置信息:', position.coords);
            const { latitude, longitude } = position.coords;
            await getWeatherDataByCoords(latitude, longitude);
        },
        (error) => {
            hideLoading();
            console.error('地理定位错误:', error);
            
            let errorMessage = '无法获取您的位置信息。';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = '位置访问被拒绝。请在浏览器设置中允许位置访问权限，然后刷新页面重试。';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = '位置信息不可用。请检查您的GPS或网络连接。';
                    break;
                case error.TIMEOUT:
                    errorMessage = '获取位置信息超时。请检查网络连接后重试。';
                    break;
                default:
                    errorMessage = '获取位置信息时发生未知错误。';
                    break;
            }
            
            showError(errorMessage);
        },
        options
    );
}

// 根据城市名获取天气数据
async function getWeatherData(city) {
    showLoading();
    
    try {
        // 转换城市名称（中文转英文）
        const convertedCity = convertCityName(city);
        console.log(`原始城市名: ${city}, 转换后: ${convertedCity}`);
        
        // 获取当前天气
        const currentResponse = await fetch(
            `${API_BASE_URL}/weather?q=${encodeURIComponent(convertedCity)}&appid=${API_KEY}&units=metric&lang=zh_cn`
        );
        
        if (!currentResponse.ok) {
            if (currentResponse.status === 401) {
                throw new Error('API密钥无效，请检查密钥是否正确或是否已激活');
            }
            throw new Error('城市未找到');
        }
        
        const currentData = await currentResponse.json();
        console.log('当前天气数据:', currentData); // 调试信息
        
        // 获取5天预报
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?q=${encodeURIComponent(convertedCity)}&appid=${API_KEY}&units=metric&lang=zh_cn`
        );
        
        const forecastData = await forecastResponse.json();
        console.log('预报数据:', forecastData); // 调试信息
        
        displayWeatherData(currentData, forecastData);
        
    } catch (error) {
        console.error('获取天气数据失败:', error);
        if (error.message.includes('API密钥无效')) {
            showError('API密钥无效！请检查以下几点：\n1. 密钥是否正确\n2. 是否已激活（新密钥需要几小时激活）\n3. 是否超出免费额度');
        } else {
            showError('获取天气信息失败，请检查城市名称或网络连接');
        }
    } finally {
        hideLoading();
    }
}

// 根据坐标获取天气数据
async function getWeatherDataByCoords(lat, lon) {
    console.log(`正在获取坐标 ${lat}, ${lon} 的天气数据`);
    
    try {
        // 获取当前天气
        const currentResponse = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=zh_cn`
        );
        
        if (!currentResponse.ok) {
            if (currentResponse.status === 401) {
                throw new Error('API密钥无效，请检查密钥是否正确或是否已激活');
            }
            throw new Error('无法获取该位置的天气信息');
        }
        
        const currentData = await currentResponse.json();
        console.log('当前位置天气数据:', currentData);
        
        // 获取5天预报
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=zh_cn`
        );
        
        const forecastData = await forecastResponse.json();
        console.log('当前位置预报数据:', forecastData);
        
        displayWeatherData(currentData, forecastData);
        
    } catch (error) {
        console.error('获取天气数据失败:', error);
        if (error.message.includes('API密钥无效')) {
            showError('API密钥无效！请检查以下几点：\n1. 密钥是否正确\n2. 是否已激活（新密钥需要几小时激活）\n3. 是否超出免费额度');
        } else {
            showError('获取天气信息失败，请检查网络连接');
        }
    } finally {
        hideLoading();
    }
}

// 显示天气数据
function displayWeatherData(currentData, forecastData) {
    console.log('开始显示天气数据:', currentData);
    hideError();
    
    // 显示当前天气
    const tempElement = document.getElementById('currentTemp');
    const cityElement = document.getElementById('cityName');
    const descElement = document.getElementById('weatherDesc');
    const timeElement = document.getElementById('updateTime');
    
    if (tempElement) tempElement.textContent = Math.round(currentData.main.temp);
    if (cityElement) cityElement.textContent = `${currentData.name}, ${currentData.sys.country}`;
    if (descElement) descElement.textContent = currentData.weather[0].description;
    if (timeElement) timeElement.textContent = `更新时间: ${new Date().toLocaleString('zh-CN')}`;
    
    // 设置天气图标
    const iconCode = currentData.weather[0].icon;
    const iconClass = weatherIcons[iconCode] || 'fas fa-sun';
    document.getElementById('weatherIcon').className = iconClass;
    
    // 显示详细信息
    document.getElementById('visibility').textContent = `${(currentData.visibility / 1000).toFixed(1)} km`;
    document.getElementById('humidity').textContent = `${currentData.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${(currentData.wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('feelsLike').textContent = `${Math.round(currentData.main.feels_like)}°C`;
    document.getElementById('pressure').textContent = `${currentData.main.pressure} hPa`;
    document.getElementById('uvIndex').textContent = '暂无数据';
    
    // 显示5天预报
    displayForecast(forecastData);
    
    // 显示天气卡片和预报
    weatherCard.style.display = 'block';
    forecastSection.style.display = 'block';
}

// 显示预报数据
function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    // 获取每天的预报数据（每3小时一个数据点，取每天中午12点的数据）
    const dailyForecasts = [];
    const processedDates = new Set();
    
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toDateString();
        
        if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
            dailyForecasts.push(item);
            processedDates.add(dateString);
        }
    });
    
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('zh-CN', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
        
        const iconCode = forecast.weather[0].icon;
        const iconClass = weatherIcons[iconCode] || 'fas fa-sun';
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-date">${dayName}<br>${monthDay}</div>
            <div class="forecast-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="forecast-desc">${forecast.weather[0].description}</div>
            <div class="forecast-temps">
                <span class="forecast-high">${Math.round(forecast.main.temp_max)}°</span>
                <span class="forecast-low">${Math.round(forecast.main.temp_min)}°</span>
            </div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

// 显示加载状态
function showLoading() {
    loading.style.display = 'block';
    weatherCard.style.display = 'none';
    forecastSection.style.display = 'none';
    errorMessage.style.display = 'none';
}

// 隐藏加载状态
function hideLoading() {
    loading.style.display = 'none';
}

// 显示错误信息
function showError(message) {
    document.getElementById('errorText').textContent = message;
    errorMessage.style.display = 'block';
    weatherCard.style.display = 'none';
    forecastSection.style.display = 'none';
}

// 隐藏错误信息
function hideError() {
    errorMessage.style.display = 'none';
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 检查API密钥
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('请先配置OpenWeatherMap API密钥');
        return;
    }
    
    // 验证API密钥
    await validateApiKey();
});

// 验证API密钥
async function validateApiKey() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/weather?q=Beijing&appid=${API_KEY}&units=metric`
        );
        
        if (response.status === 401) {
            showError('API密钥无效！请检查以下几点：\n1. 密钥是否正确复制\n2. 新密钥需要几小时才能激活\n3. 请确认账户状态正常\n\n暂时显示演示数据');
            setTimeout(showDemoData, 2000);
        } else if (response.ok) {
            apiKeyValid = true;
            console.log('API密钥验证成功');
        }
    } catch (error) {
        console.log('API密钥验证失败，显示演示数据');
        showError('网络连接问题，暂时显示演示数据');
        setTimeout(showDemoData, 2000);
    }
}

// 模拟数据功能（当没有API密钥时使用）
function showDemoData() {
    const demoCurrentData = {
        name: '北京',
        sys: { country: 'CN' },
        main: {
            temp: 22,
            feels_like: 25,
            humidity: 65,
            pressure: 1013
        },
        weather: [{
            description: '多云',
            icon: '02d'
        }],
        wind: { speed: 3.5 },
        visibility: 10000
    };
    
    const demoForecastData = {
        list: [
            {
                dt: Date.now() / 1000,
                main: { temp_max: 25, temp_min: 18 },
                weather: [{ description: '晴天', icon: '01d' }]
            },
            {
                dt: (Date.now() / 1000) + 86400,
                main: { temp_max: 23, temp_min: 16 },
                weather: [{ description: '多云', icon: '02d' }]
            },
            {
                dt: (Date.now() / 1000) + 172800,
                main: { temp_max: 20, temp_min: 14 },
                weather: [{ description: '小雨', icon: '10d' }]
            },
            {
                dt: (Date.now() / 1000) + 259200,
                main: { temp_max: 24, temp_min: 17 },
                weather: [{ description: '晴天', icon: '01d' }]
            },
            {
                dt: (Date.now() / 1000) + 345600,
                main: { temp_max: 26, temp_min: 19 },
                weather: [{ description: '多云', icon: '02d' }]
            }
        ]
    };
    
    displayWeatherData(demoCurrentData, demoForecastData);
}

// 如果没有API密钥，显示演示数据
if (API_KEY === 'YOUR_API_KEY_HERE') {
    setTimeout(() => {
        showDemoData();
    }, 1000);
}