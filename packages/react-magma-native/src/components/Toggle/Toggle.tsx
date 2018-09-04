import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ToggleCore } from 'react-magma-core'

export interface ToggleProps {
    isOn?: boolean,
    handleToggle?: () => void
}

export const Toggle: React.SFC<ToggleProps> = (props: ToggleProps): JSX.Element => (
    <ToggleCore>
        {({ isOn, handleToggle }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={handleToggle}
                style={styles.toggleView}
              >
                <Text>{isOn ? 'On' : 'Off'}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
    </ToggleCore>
)

const styles = StyleSheet.create({
    toggleView: {
        width: 200,
        height: 50,
        backgroundColor: '#ccc'
    }
});

export default Toggle;