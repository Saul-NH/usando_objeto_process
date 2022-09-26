import { fork } from 'child_process';

export const index = async (req, res) => {
    try {
        res.render('randoms', {});
    } catch (error) {
        console.log(error);
    }
};

export const calculate = async (req, res) => {
    try {
        const total = req.query.amount || 100000000;
        const randoms = fork('src/utils/randoms.js');
        randoms.send(total);

        randoms.on('message', (numbersObject) => {
            res.json({
                numbersObject,
            });
        });
    } catch (error) {
        console.log(error);
    }
};
