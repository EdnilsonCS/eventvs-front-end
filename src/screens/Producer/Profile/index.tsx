/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-indent */
import { ProfileScreenProps } from '@routes/private.routes';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
    Bold,
    Buttons,
    ButtonContainer,
    Container,
    Email,
    Img,
    Name,
    Wrapper
} from './styles'

const items = [
    {
        title: "Nome",
    },{
        title: "Senha",
    },{
        title: "Nova Senha",
    }
]

interface ITitle {
    title: string
}

const Field = ({ title }: ITitle): JSX.Element => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}


export default function Profile({ navigation }: ProfileScreenProps): JSX.Element {
    return (
        <Container style={styles.container}>
            <Wrapper style={{alignItems: 'center',}}>
                <Img source={{ uri: 'https://www.github.com/EdnilsonCS.png' }} />
            </Wrapper>
            <Wrapper>
                <Email><Bold>ednilsoncs@dcomp.ufs.br</Bold></Email>
                <Name><Bold>Ednilson Cardoso dos Santos</Bold></Name>
            </Wrapper>
            <FlatList
              data={items}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item + index.toString()}
              renderItem={({ item }) => <TouchableOpacity><Field title={item.title} /></TouchableOpacity>}
            />
            <ButtonContainer>
                <Buttons style={{backgroundColor: '#6A2ABA',marginBottom: 14}} onPress={() => navigation.navigate('Home')}>
                    Atualizar
                </Buttons>
                <Buttons style={{backgroundColor: '#DE0b20',marginBottom: 30}} onPress={() => navigation.navigate('Login')}>
                    Sair
                </Buttons>
            </ButtonContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        marginVertical: 8,
        borderColor: '#6A2ABA',
        borderWidth: 2,
        borderRadius: 15
    },
    title: {
        fontSize: 16,
        fontFamily: 'Lato'
    }
})
