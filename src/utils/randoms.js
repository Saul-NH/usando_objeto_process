process.on('message', (total) => {
    const numbersObject = {};

    for (let i = 0; i < total; i++) {
        const numero = Math.floor(Math.random() * 1000 + 1);

        if (numero in numbersObject) numbersObject[numero]++;
        else numbersObject[numero] = 1;
    }
    process.send(numbersObject);
});
