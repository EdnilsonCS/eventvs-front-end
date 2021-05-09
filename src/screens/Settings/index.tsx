import React from "react"
import {
    SectionList,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
} from 'react-native'

import { Container, Img } from './styles'

const items = [
    {
        title: "Conta",
        data: ["Email", "Nome"]
    }, {
        title: "Eventos",
        data: ["Eventos participados"]
    }
]

interface ITitle {
    title: string
}

const Item = ({ title }: ITitle): JSX.Element => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}


export default function Settings(): JSX.Element {
    return (
        <Container style={styles.container}>
            <View style={{alignItems: 'center',}}>
                <Img source={{ uri: 'https://www.github.com/EdnilsonCS.png' }} />
            </View>
            <SectionList
                sections={items}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <TouchableOpacity><Item title={item} /></TouchableOpacity>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: "#f5f5f5",
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
        padding: 10
    },
    title: {
        fontSize: 24,
        fontFamily: 'Lato'
    }
})