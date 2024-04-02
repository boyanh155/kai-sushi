

    int[] insert(int[] data, int index, int value) {
    int[] b = newArr(data.length + 1);
    if (index < 0) {
        copy(data, 0, data.length, b, 1);
        b[0] = value;
    } else if (index >= data.length) {
        copy(data, 0, data.length, b, 0);
        b[b.length - 1] = value;
    } else {
        copy(data, 0, index, b, 0);
        b[index] = value;
        copy(data, index, data.length - index, b, index + 1);
    }
    return b;
}

  int[] delete(int[] data, int index) {
    if (index < 0 || index >= data.length) {
        return data;
    }
    int[] b = newArr(data.length - 1);
    copy(data, 0, index, b, 0);
    copy(data, index + 1, data.length - index - 1, b, index);
    return b;
}
int[] removeOccurrences(int[] data, int value) {
    int index = indexOf(data, value);
    while (index != -1) {
        int[] newData = newArr(data.length - 1);
        copy(data, 0, index, newData, 0);
        copy(data, index + 1, data.length - index - 1, newData, index);
        data = newData;
        index = indexOf(data, value);
    }
    return data;
}