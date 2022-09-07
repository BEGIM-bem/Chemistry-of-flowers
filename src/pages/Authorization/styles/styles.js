
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    authForm__inputCorrect: {
        border: '1px solid #000000',
        boxSizing: 'border-box',

        borderRadius: '10px',
        width: '25vmax',
        height: '8vmin',
        paddingLeft: '3%',
        marginTop: '3%',
        fontSize: '1.3vmax',
        fontFamily: 'Montserrat',



        lineHeight: '1.5vw',
        color: '#000000'
    },

    authForm__inputError: {
        border: '1px solid #F73B3B',
        boxSizing: 'border-box',

        borderRadius: '10px',
        width: '25vmax',
        height: '8vmin',
        paddingLeft: '3%',
        marginTop: '3%',
        fontSize: '1.3vmax',
        fontFamily: 'Montserrat',
        lineHeight: '1.5vw',
        color: '#000000'
    },

    authForm__password_visibility: {
        color: '#000000',
        fontSize: '1.9vmax',
    },




}))

export { useStyles }