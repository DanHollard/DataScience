<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Graph Builder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
        }
        nav {
            margin: 20px;
        }
        nav a {
            margin: 10px;
            text-decoration: none;
            color: #4CAF50;
        }
        main {
            margin: 20px;
        }
        footer {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 10px;
            position: fixed;
            width: 100%;
            bottom: 0;
        }
        form {
            margin-bottom: 20px;
        }
        input[type="text"] {
            padding: 10px;
            margin: 5px;
            width: 150px;
        }
        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        canvas {
            background-color: white;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <header>
        <h1>Graph Builder</h1>
    </header>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
    </nav>
    <main>
        <h2>Input Data</h2>
        <form id="dataForm">
            <label for="xValues">X Values (comma-separated):</label><br>
            <input type="text" id="xValues" name="xValues"><br>
            <label for="yValues">Y Values (comma-separated):</label><br>
            <input type="text" id="yValues" name="yValues"><br><br>
            <button type="button" onclick="generateGraph()">Generate Graph</button>
        </form>
        <h2>Graph</h2>
        <canvas id="myChart" width="400" height="400"></canvas>
    </main>
    <footer>
        <p>&copy; 2024 My First Webpage</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        function generateGraph() {
            const xValues = document.getElementById('xValues').value.split(',').map(Number);
            const yValues = document.getElementById('yValues').value.split(',').map(Number);
            
            const ctx = document.getElementById('myChart').getContext('2d');
            if (window.myChart instanceof Chart) {
                window.myChart.destroy();
            }
            window.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'User Data',
                        data: yValues,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'X Values'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Y Values'
                            }
                        }
                    }
                }
            });
        }
    </script>
</body>
</html>