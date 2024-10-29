import { AppContext } from "./AppContext";

// @ts-ignore
export function StageConsumer({children}) {
    return (
        <AppContext.Consumer>
            {context => {
                if (context === undefined) {
                    throw new Error('CountConsumer must be used within a CountProvider')
                }
                return children(context)
            }}
        </AppContext.Consumer>
    )
}