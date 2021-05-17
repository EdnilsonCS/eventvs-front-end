import styled from 'styled-components/native';

export const Container = styled.View`
  border-width: 1px;
  border-color: #6d43a1;
  border-radius: 10px;
  height: 200px;
  margin-bottom: 32px;
  padding: 0px 18px;
`

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`

export const Title = styled.Text`
  color: #6d43a1;
  font-size: 20px;
`

export const Bold = styled.Text`
    font-weight: bold;
`

export const Button = styled.TouchableOpacity`
  background-color:   #DE0B20;
  border-radius: 7px;
`

export const ButtonText = styled.Text`
  margin-left: 15px;
  margin-right: 15px;
  color: white;
`