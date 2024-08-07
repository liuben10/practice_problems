class Excel:

    def __init__(self, rows: int, cols: int, includeHeader: bool):
        self.ROWS = rows if not includeHeader else rows + 1
        self.COLS = cols

        self.includeHeader = includeHeader

        self.sheet = [["" for _ in range(self.COLS)] for _ in range(self.ROWS)]
        if (self.includeHeader):
            self.processExcelColNames()

    def colHeaderToInt(self, c: str) -> int:
        num = 0
        i = 0
        while i < len(c):
            num = 26 * num + (ord(c[i]) - ord('A') + 1)
            i += 1
        return num


    def colHeader(self, c: int) -> str:
        header = ""
        while(c > 0):
            d = (c - 1) % 26
            header = chr(ord('A') + d) + header
            c = (c - 1) // 26
        return header
    
    def set_cell_value(self, cx: int, cy: int, val: int) -> None:
        assert cx > 0 and cy > 0, f"ERROR, both {cx} and {cy} must be natural"
        self.sheet[cx-1][cy-1] = val

    def get_cell_value(self, cx: int, cy: int) -> None:
        assert cx > 0 and cy > 0, f"ERROR, both {cx} and {cy} must be natural"
        return self.sheet[cx-1][cy-1]
    
    def get_top_n_rows(self, n: int, col: int) -> None:
        copysheet = self.sheet.copy()
        copysheet.sort(key = lambda x: x[col])
        return copysheet[-n:]
    
    def processExcelColNames(self):
        for c in range(self.COLS):
            self.sheet[0][c] = self.colHeader(c)


def test_excel_header(num, expectTest):
    ROWS = 0
    COLS = 0
    e = Excel(ROWS, COLS, True)
    headers = e.colHeader(num)
    assert headers == expectTest, f"ERROR, headers {headers} did not match {expectTest}, for {num}"

def test_header_to_int(header, expi):
    ROWS = 0
    COLS = 0
    e = Excel(ROWS, COLS, True)
    headers = e.colHeaderToInt(header)
    assert headers == expi, f"ERROR, headers {headers} did not match {expi}, for {header}" 

def test_putget(num, cellid):
    ROWS = 0
    COLS = 0
    e = Excel(ROWS, COLS, True)

test_excel_header(1, "A")
test_excel_header(27, "AA")
test_excel_header(26, "Z")
test_excel_header(52, "AZ")
test_excel_header(701, "ZY")
test_header_to_int("A", 1)
test_header_to_int("AA", 27)
test_header_to_int("AZ" , 52)
test_header_to_int("ZY", 701)
