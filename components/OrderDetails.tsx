import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Caption, Divider, Headline, Paragraph } from "react-native-paper";
import { parseDateTimeSeconds } from "../utilities/datetime";


export default function OrderDetails({ route, navigation }: any) {
    const { order } = route.params;

    return (
        <ScrollView style={styles.container}>
            { order.sales_order_id == null && 
                <>
                    <View style={{ marginTop: 30 }} />
                    <Headline style={styles.centerText}>Custom Delivery Order</Headline>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Delivery Address</Caption>
                        <Paragraph style={styles.centerText}>{order.address}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Delivery Postal Code</Caption>
                        <Paragraph style={styles.centerText}>{order.postal_code}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Delivery Remarks</Caption>
                        <Paragraph style={styles.centerText}>{order.remarks || '-'}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Completed At</Caption>
                        <Paragraph style={styles.centerText}>{order.deliver_at ? parseDateTimeSeconds(order.deliver_at) : '-'}</Paragraph>
                    </View>
            
                    { order.signature && 
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Image style={{ resizeMode: "contain",  width: 200, height: 200 }} source={{ uri: order.signature }}/>
                        </View>
                    }
                </>
            }

            { order.sales_order_id != null && 
                <>
                    <View style={{ marginTop: 30 }} />
                    <Headline style={styles.centerText}>Delivery for Sales Order ID {order.sales_order_id}</Headline>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Company</Caption>
                        <Paragraph style={styles.centerText}>{order.sales_order.customer.company_name || '-'}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Contact Name</Caption>
                        <Paragraph style={styles.centerText}>{order.sales_order.customer.p1_name || '-'}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Contact Number</Caption>
                        <Paragraph style={styles.centerText}>{order.sales_order.customer.p1_phone_number || '-'}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Delivery Address</Caption>
                        <Paragraph style={styles.centerText}>{order.address}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Delivery Postal Code</Caption>
                        <Paragraph style={styles.centerText}>{order.postal_code}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Delivery Remarks</Caption>
                        <Paragraph style={styles.centerText}>{order.remarks || '-'}</Paragraph>
                    </View>
                    <View style={styles.section}>
                        <Caption style={styles.centerText}>Completed At</Caption>
                        <Paragraph style={styles.centerText}>{order.deliver_at ? parseDateTimeSeconds(order.deliver_at) : '-'}</Paragraph>
                    </View>
            
                    { order.signature && 
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Image style={{ resizeMode: "contain",  width: 200, height: 200 }} source={{ uri: order.signature }}/>
                        </View>
                    }

                    <View style={styles.section} />
                    <Divider />
                    <View style={styles.section} />

                    <Headline style={styles.centerText}>Order Items</Headline>
                    { order.sales_order.sales_order_items.map((x: any, index: number) => (
                        <View style={styles.section} key={index}>
                            <Paragraph style={styles.centerText}>{x.product.name}</Paragraph>
                            <Caption style={styles.centerText}>Quantity: {x.quantity}</Caption>
                        </View>
                    ))}

                    <View style={{ marginBottom: 30 }} />
                </>
            }
                
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#FFF",
  },
  section: {
    textAlign: 'center',
    marginTop: 15,
  },
  centerText: {
    textAlign: 'center',
  },
});