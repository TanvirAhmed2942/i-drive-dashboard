"use client";

import React from "react";
import {
    Document,
    Page,
    View,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";
import type { TaxRecord } from "./RecordTable";

// Use built-in Helvetica to avoid font registration issues
const styles = StyleSheet.create({
    page: {
        padding: 28,
        fontSize: 9,
        fontFamily: "Helvetica",
    },
    // Header: checkbox + OMB left; year + titles center; Copy B right
    headerRow: {
        flexDirection: "row",
        marginBottom: 6,
        alignItems: "flex-start",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    correctedCheckbox: {
        width: 11,
        height: 11,
        borderWidth: 1,
        borderColor: "#000",
        marginRight: 6,
    },
    ombNo: {
        fontSize: 8,
    },
    headerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    year: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 1,
    },
    formTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 0,
    },
    formSubtitle: {
        fontSize: 9,
        fontWeight: "bold",
    },
    copyB: {
        fontSize: 9,
        marginTop: 18,
        marginLeft: 8,
    },
    twoCol: {
        flexDirection: "row",
        marginTop: 8,
        gap: 12,
    },
    leftCol: {
        width: "54%",
    },
    rightCol: {
        width: "46%",
    },
    // Payer block - light blue (#B8D4E8)
    payerBlock: {
        backgroundColor: "#B8D4E8",
        padding: 5,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: "#000",
    },
    fieldLabel: {
        fontSize: 6.5,
        marginBottom: 1,
        color: "#000",
    },
    fieldValue: {
        fontSize: 9,
    },
    payerTINBlock: {
        backgroundColor: "#B8D4E8",
        padding: 5,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: "#000",
    },
    // Recipient - light pink/red (#F4CCCC)
    recipientBlock: {
        backgroundColor: "#F4CCCC",
        padding: 5,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: "#000",
    },
    accountBlock: {
        padding: 5,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: "#000",
        minHeight: 20,
    },
    fatcaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 4,
    },
    fatcaCheckbox: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: "#000",
        marginRight: 4,
    },
    fatcaLabel: {
        fontSize: 8,
    },
    // Box 1 - light green (#D4EDDA)
    box1: {
        backgroundColor: "#D4EDDA",
        padding: 6,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: "#000",
    },
    boxValue: {
        fontSize: 9,
        fontWeight: "bold",
    },
    boxEmpty: {
        padding: 5,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: "#000",
        minHeight: 20,
    },
    box4: {
        padding: 5,
        marginBottom: 3,
        borderWidth: 0.5,
        borderColor: "#000",
    },
    boxPlaceholder: {
        fontSize: 8,
        color: "#666",
    },
    instructionText: {
        fontSize: 6,
        marginTop: 6,
        paddingLeft: 2,
        lineHeight: 1.3,
    },
    footer: {
        position: "absolute",
        bottom: 18,
        left: 28,
        right: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 7,
    },
    footerRight: {
        flexDirection: "row",
        gap: 4,
    },
});

/** Optional recipient details (TIN, address, account). When not provided, fields render blank. */
export type RecipientInfo = {
    tin?: string;
    street?: string;
    cityStateZip?: string;
    accountNumber?: string;
};

/** Optional payer details. When not provided, defaults are used. */
export type PayerInfo = {
    name: string;
    street: string;
    cityStateZip: string;
    phone: string;
    tin: string;
};

const DEFAULT_PAYER: PayerInfo = {
    name: "Your Business Name LLC",
    street: "88 Home Street",
    cityStateZip: "Hometown, NY 54321",
    phone: "(123) 456-7890",
    tin: "98-7654321",
};

function formatBox1Amount(amount: string): string {
    const trimmed = (amount || "").trim();
    if (!trimmed) return "$0.00";
    if (/^\$/.test(trimmed)) return trimmed;
    const num = parseFloat(trimmed.replace(/[$,]/g, ""));
    if (Number.isNaN(num)) return trimmed;
    return `$${num.toFixed(2)}`;
}

export type Form1099NECProps = {
    /** Tax record (driver name, tax year, Box 1 amount). */
    record: TaxRecord;
    /** Payer info. Omit to use default placeholder. */
    payer?: PayerInfo;
    /** Recipient TIN, address, account number. Omit to leave those fields blank. */
    recipient?: RecipientInfo;
};

export function Form1099NECDocument({ record, payer = DEFAULT_PAYER, recipient }: Form1099NECProps) {
    const year = record.taxYear || "";
    const box1Amount = formatBox1Amount(record.totalAnnualEarnings || "");
    const recipientName = record.driverName || "";
    const recipientTin = recipient?.tin ?? "";
    const recipientStreet = recipient?.street ?? "";
    const recipientCityStateZip = recipient?.cityStateZip ?? "";
    const accountNumber = recipient?.accountNumber ?? "";

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                {/* Header: CORRECTED checkbox + OMB left; Year + titles center; Copy B right */}
                <View style={styles.headerRow}>
                    <View style={styles.headerLeft}>
                        <View style={styles.correctedCheckbox} />
                        <Text style={styles.ombNo}>OMB No. 1545-0116</Text>
                    </View>
                    <View style={styles.headerCenter}>
                        <Text style={styles.year}>{year}</Text>
                        <Text style={styles.formTitle}>Nonemployee Compensation</Text>
                        <Text style={styles.formSubtitle}>Form 1099-NEC</Text>
                    </View>
                    <Text style={styles.copyB}>Copy B For Recipient</Text>
                </View>

                <View style={styles.twoCol}>
                    <View style={styles.leftCol}>
                        <View style={styles.payerBlock}>
                            <Text style={styles.fieldLabel}>
                                PAYER&apos;S name, street address, city or town, state or province, country, ZIP or foreign postal code, and telephone no.
                            </Text>
                            <Text style={styles.fieldValue}>{payer.name}</Text>
                            <Text style={styles.fieldValue}>{payer.street}</Text>
                            <Text style={styles.fieldValue}>{payer.cityStateZip}</Text>
                            <Text style={styles.fieldValue}>{payer.phone}</Text>
                        </View>
                        <View style={styles.payerTINBlock}>
                            <Text style={styles.fieldLabel}>PAYER&apos;S TIN</Text>
                            <Text style={styles.fieldValue}>{payer.tin}</Text>
                        </View>
                        <View style={styles.recipientBlock}>
                            <Text style={styles.fieldLabel}>RECIPIENT&apos;S TIN</Text>
                            <Text style={styles.fieldValue}>{recipientTin}</Text>
                        </View>
                        <View style={styles.recipientBlock}>
                            <Text style={styles.fieldLabel}>RECIPIENT&apos;S name</Text>
                            <Text style={styles.fieldValue}>{recipientName}</Text>
                        </View>
                        <View style={styles.recipientBlock}>
                            <Text style={styles.fieldLabel}>Street address (including apt. no.)</Text>
                            <Text style={styles.fieldValue}>{recipientStreet}</Text>
                        </View>
                        <View style={styles.recipientBlock}>
                            <Text style={styles.fieldLabel}>
                                City or town, state or province, country, and ZIP or foreign postal code
                            </Text>
                            <Text style={styles.fieldValue}>{recipientCityStateZip}</Text>
                        </View>
                        <View style={styles.accountBlock}>
                            <Text style={styles.fieldLabel}>Account number (see instructions)</Text>
                            <Text style={styles.fieldValue}>{accountNumber}</Text>
                        </View>
                        <View style={styles.fatcaRow}>
                            <View style={styles.fatcaCheckbox} />
                            <Text style={styles.fatcaLabel}>FATCA filing requirement</Text>
                        </View>
                    </View>

                    <View style={styles.rightCol}>
                        <View style={styles.box1}>
                            <Text style={styles.fieldLabel}>1 Nonemployee compensation</Text>
                            <Text style={styles.boxValue}>{box1Amount}</Text>
                        </View>
                        <View style={styles.boxEmpty}>
                            <Text style={styles.fieldLabel}>2</Text>
                        </View>
                        <View style={styles.boxEmpty}>
                            <Text style={styles.fieldLabel}>3</Text>
                        </View>
                        <View style={styles.box4}>
                            <Text style={styles.fieldLabel}>4 Federal income tax withheld</Text>
                            <Text style={styles.fieldValue}>-</Text>
                        </View>
                        <View style={styles.box4}>
                            <Text style={styles.fieldLabel}>5 State tax withheld</Text>
                            <Text style={styles.boxPlaceholder}>$_________  $_________</Text>
                        </View>
                        <View style={styles.boxEmpty}>
                            <Text style={styles.fieldLabel}>6 State/Payer&apos;s state no.</Text>
                        </View>
                        <View style={styles.box4}>
                            <Text style={styles.fieldLabel}>7 State income</Text>
                            <Text style={styles.boxPlaceholder}>$_________  $_________</Text>
                        </View>
                        <Text style={styles.instructionText}>
                            This is important tax information and is being furnished to the IRS. If you are required to file a return, a negligence penalty or other sanction may be imposed on you if this income is taxable and the IRS determines that it has not been reported.
                        </Text>
                    </View>
                </View>

                <View style={styles.footer} fixed>
                    <Text>Form 1099-NEC (keep for your records)</Text>
                    <View style={styles.footerRight}>
                        <Text>www.irs.gov/Form1099NEC</Text>
                        <Text>Department of the Treasury - Internal Revenue Service</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

/** Generate 1099-NEC PDF blob and trigger download for the given tax record. Pass payer/recipient when you have dynamic data. */
export async function download1099PDF(
    record: TaxRecord,
    options?: { payer?: PayerInfo; recipient?: RecipientInfo }
): Promise<void> {
    const { pdf } = await import("@react-pdf/renderer");
    const doc = (
        <Form1099NECDocument
            record={record}
            payer={options?.payer}
            recipient={options?.recipient}
        />
    );
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `1099-NEC-${record.driverName.replace(/\s+/g, "-")}-${record.taxYear}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
}
