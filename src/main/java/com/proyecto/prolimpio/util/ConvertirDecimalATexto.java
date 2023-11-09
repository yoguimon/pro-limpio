package com.proyecto.prolimpio.util;
public class ConvertirDecimalATexto {
    private static final String[] UNIDADES = {
            "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"
    };

    private static final String[] DECENAS = {
            "diez", "once", "doce", "trece", "catorce", "quince", "dieciseis",
            "diecisiete", "dieciocho", "diecinueve"
    };

    private static final String[] DECENAS2 = {
            "veinte", "treinta", "cuarenta", "cincuenta",
            "sesenta", "setenta", "ochenta", "noventa"
    };

    private static final String[] CENTENAS = {
            "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
            "seiscientos", "setecientos", "ochocientos", "novecientos"
    };

    public static String convertirNumero(double numero) {
        // Separar la parte entera y la parte decimal
        long parteEntera = (long) numero;
        double parteDecimal = numero - parteEntera;

        // Convertir la parte entera a palabras
        String parteEnteraEnPalabras = convertirParteEntera(parteEntera);

        // Convertir la parte decimal a fracción
        String parteDecimalEnFraccion = convertirParteDecimal(parteDecimal);

        // Combinar la parte entera y la parte decimal en palabras
        return parteEnteraEnPalabras + " con " + parteDecimalEnFraccion;
    }

    private static String convertirParteEntera(long numero) {
        if (numero < 10) {
            return UNIDADES[(int) numero];
        } else if (numero < 20) {
            return DECENAS[(int) (numero - 10)];
        } else if (numero < 100) {
            long unidad = numero % 10;
            if (unidad == 0) {
                return DECENAS2[(int) (numero / 10) - 2];
            } else {
                return DECENAS2[(int) (numero / 10) - 2] + " y " + UNIDADES[(int) unidad];
            }
        } else if (numero < 1000) {
            long decena = numero % 100;
            if (decena == 0) {
                return CENTENAS[(int) (numero / 100)];
            } else {
                return CENTENAS[(int) (numero / 100)] + " " + convertirParteEntera(decena);
            }
        } else if (numero < 10000) {
            long resto = numero % 1000;
            if (resto == 0) {
                return UNIDADES[(int) (numero / 1000)] + " mil";
            } else {
                return UNIDADES[(int) (numero / 1000)] + " mil " + convertirParteEntera(resto);
            }
        } else {
            return "Número fuera de rango";
        }
    }

    private static String convertirParteDecimal(double numero) {
        // Multiplicar la parte decimal por 100 para obtener los dos dígitos
        int parteDecimalMultiplicada = (int) (numero * 100);
        return parteDecimalMultiplicada + "/100";
    }
}
