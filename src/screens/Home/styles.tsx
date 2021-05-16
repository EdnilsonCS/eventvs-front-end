import styled from 'styled-components/native'
import Entypo from 'react-native-vector-icons/Entypo'

export const Entipo = styled(Entypo).attrs( () => ({
    color:'#000',
    name: 'check',
    size: 20
}))`
    margin-right: 15px
`

export const Container = styled.View`
    background-color: white;
    flex: 1;
`

export const Header = styled.Text`
    align-self: center;
    font-size: 40px;
    padding: 15px;
    font-weight: bold; 
    font-family: Lato;
`

export const Wrapper = styled.View`
    border-bottom-color: #bbb;
    border-bottom-width: 1px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Title = styled.Text`
    font-weight: bold;
    font-size: 20px;
    margin: 15px;
`