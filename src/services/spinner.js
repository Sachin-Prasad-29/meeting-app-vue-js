// this services Is using to create the loading screen object
export const spinner = () => {
    return this.$loading.show({
        color: 'rgb(51, 102, 255)',
        backgroundColor: 'lightblue',
        blur: '9px',
        height: 150,
        width: 150,
    });
};
