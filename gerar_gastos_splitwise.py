# -*- coding: utf-8 -*-
"""Gastos compartilhados + pessoais (visão Splitwise + total da viagem). Google Sheets."""
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import CellIsRule
from pathlib import Path

MEMBROS = ["Eduardo", "Karina", "Bruno", "Gabriele"]
N_ROWS = 120

wb = Workbook()
header_fill = PatternFill("solid", fgColor="1F4E79")
header_font = Font(color="FFFFFF", bold=True, size=11)
title_font = Font(bold=True, size=16, color="1F4E79")
neg_fill = PatternFill("solid", fgColor="FFC7CE")
pos_fill = PatternFill("solid", fgColor="C6EFCE")
hint_fill = PatternFill("solid", fgColor="FFF2CC")
thin = Border(
    left=Side(style="thin", color="D0D0D0"),
    right=Side(style="thin", color="D0D0D0"),
    top=Side(style="thin", color="D0D0D0"),
    bottom=Side(style="thin", color="D0D0D0"),
)

def hdr(ws, row, cols):
    for c in range(1, cols + 1):
        cell = ws.cell(row, c)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")

def width(ws, widths):
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w

# ========== Instrucoes ==========
ws = wb.active
ws.title = "Instrucoes"
ws["A1"] = "Gastos Orlando · compartilhados + pessoais (tipo Splitwise)"
ws["A1"].font = title_font
linhas = [
    "",
    "Site: https://eduardohidekiy.github.io/viagem-orlando/",
    "Membros: Eduardo, Karina, Bruno, Gabriele",
    "",
    "O QUE LANÇAR AQUI",
    "TUDO que você quiser acompanhar na viagem:",
    "• Compartilhado — casa, carro, mercado, Uber juntos… (divide e gera saldo entre vocês)",
    "• Pessoal — seu ingresso, seu e-SIM, sua lembrancinha, seu almoço sozinho… (entra no SEU total da viagem e NÃO gera dívida)",
    "",
    "COMO USAR NO GOOGLE SHEETS",
    "1. Upload deste arquivo no Drive → Abrir com Planilhas Google → Salvar como Planilhas Google.",
    "2. Aba Gastos: selecione F2:I121 (Eduardo…Gabriele) → Inserir → Caixa de seleção.",
    "3. Compartilhar com o grupo (edição).",
    "4. Cole o link no site (PLANILHA_GASTOS).",
    "",
    "COMO LANÇAR",
    "1. Data, Descrição, Valor em R$ (sempre a mesma moeda).",
    "2. Quem pagou = quem tirou do cartão/bolso.",
    "3. Tipo = Compartilhado ou Pessoal.",
    "4. Se Compartilhado: marque quem divide (em geral os 4).",
    "5. Se Pessoal: não precisa marcar caixas — a cota vai 100% para quem pagou.",
    "6. Veja Resumo: Saldo (quem deve a quem) + Custo da viagem (quanto cada um está gastando no total).",
    "",
    "LEITURA DO RESUMO",
    "• Total pagou = dinheiro que saiu do bolso/cartão dessa pessoa.",
    "• Cota comum = parte dela nos gastos compartilhados.",
    "• Gastos pessoais = o que ela lançou como Pessoal.",
    "• Custo da viagem = cota comum + gastos pessoais (noção real do quanto a viagem está custando para ela).",
    "• Saldo = Total pagou − (cota comum + pessoais). Positivo = a receber; negativo = a pagar.",
    "  (Nos pessoais, pagou e cota se anulam — o saldo só muda com compartilhados.)",
]
for i, t in enumerate(linhas, 2):
    ws.cell(i, 1, t)
    if t.isupper() or t.startswith("O QUE") or t.startswith("COMO") or t.startswith("LEITURA"):
        ws.cell(i, 1).font = Font(bold=True, color="1F4E79")
width(ws, [105])

# ========== Membros ==========
ws = wb.create_sheet("Membros")
ws.append(["Nome", "Núcleo", "Ativo"])
hdr(ws, 1, 3)
for n, g in [("Eduardo", "Família"), ("Karina", "Família"), ("Bruno", "Casal"), ("Gabriele", "Casal")]:
    ws.append([n, g, True])
ws["A7"] = "Não renomeie os nomes sem ajustar as fórmulas."
ws["A7"].fill = hint_fill
width(ws, [14, 12, 10])

# ========== Gastos ==========
# A Data, B Desc, C Valor, D Quem pagou, E Tipo,
# F Eduardo, G Karina, H Bruno, I Gabriele,
# J Cota E, K Cota K, L Cota B, M Cota G,
# N Qtd, O Categoria, P Obs
ws = wb.create_sheet("Gastos")
headers = [
    "Data", "Descrição", "Valor (R$)", "Quem pagou", "Tipo",
    "Eduardo", "Karina", "Bruno", "Gabriele",
    "Cota Eduardo", "Cota Karina", "Cota Bruno", "Cota Gabriele",
    "Qtd pessoas", "Categoria", "Obs",
]
ws.append(headers)
hdr(ws, 1, len(headers))
ws.row_dimensions[1].height = 34

dv_pago = DataValidation(type="list", formula1='"Eduardo,Karina,Bruno,Gabriele"', allow_blank=True)
ws.add_data_validation(dv_pago)
dv_pago.add(f"D2:D{N_ROWS+1}")

dv_tipo = DataValidation(type="list", formula1='"Compartilhado,Pessoal"', allow_blank=True)
ws.add_data_validation(dv_tipo)
dv_tipo.add(f"E2:E{N_ROWS+1}")

dv_cat = DataValidation(
    type="list",
    formula1='"Casa,Carro,Seguro carro,Estacionamento,Gasolina,Mercado,Comida,Ingresso,Internet,Seguro viagem,Lembrancinha,Farmácia,Roupa,Uber,Outro comum,Outro pessoal"',
    allow_blank=True,
)
ws.add_data_validation(dv_cat)
dv_cat.add(f"O2:O{N_ROWS+1}")

dv_bool = DataValidation(type="list", formula1='"TRUE,FALSE"', allow_blank=True)
ws.add_data_validation(dv_bool)
dv_bool.add(f"F2:I{N_ROWS+1}")

nomes = ["Eduardo", "Karina", "Bruno", "Gabriele"]
# checkbox cols F=6 ... I=9; cota cols J=10 ... M=13
for r in range(2, N_ROWS + 2):
    for col in range(6, 10):
        ws.cell(r, col, False)

    # Qtd: se Pessoal = 1; se Compartilhado = count checkboxes
    ws.cell(r, 14, f'=IF(C{r}="","",IF(E{r}="Pessoal",1,COUNTIF(F{r}:I{r},TRUE)))')

    for i, nome in enumerate(nomes):
        cota_col = 10 + i
        check_col = get_column_letter(6 + i)
        # Pessoal: cota = valor só para quem pagou
        # Compartilhado: cota = valor/qtd se marcado
        ws.cell(
            r,
            cota_col,
            f'=IF(C{r}="","",'
            f'IF(E{r}="Pessoal",IF(D{r}="{nome}",C{r},0),'
            f'IF(N{r}=0,"",IF({check_col}{r}=TRUE,C{r}/N{r},0))))',
        )
        ws.cell(r, cota_col).number_format = "#,##0.00"

    ws.cell(r, 3).number_format = "#,##0.00"
    for c in range(1, 17):
        ws.cell(r, c).border = thin

# Exemplos
exemplos = [
    ("", "EXEMPLO compartilh. — Mercado Walmart (apague)", 400, "Bruno", "Compartilhado",
     True, True, True, True, "Mercado", "÷ 4"),
    ("", "EXEMPLO pessoal — e-SIM do Eduardo (apague)", 175, "Eduardo", "Pessoal",
     False, False, False, False, "Internet", "Só entra no custo dele"),
    ("", "EXEMPLO pessoal — lembrancinha Karina (apague)", 80, "Karina", "Pessoal",
     False, False, False, False, "Lembrancinha", ""),
]
for i, ex in enumerate(exemplos):
    r = 2 + i
    data, desc, valor, pagou, tipo, e, k, b, g, cat, obs = ex
    ws.cell(r, 1, data)
    ws.cell(r, 2, desc)
    ws.cell(r, 3, valor)
    ws.cell(r, 4, pagou)
    ws.cell(r, 5, tipo)
    ws.cell(r, 6, e)
    ws.cell(r, 7, k)
    ws.cell(r, 8, b)
    ws.cell(r, 9, g)
    ws.cell(r, 15, cat)
    ws.cell(r, 16, obs)
    for c in range(1, 17):
        ws.cell(r, c).fill = hint_fill

ws.freeze_panes = "A2"
ws.auto_filter.ref = f"A1:P{N_ROWS+1}"
width(ws, [11, 40, 11, 12, 14, 10, 10, 10, 10, 12, 12, 12, 12, 11, 14, 24])

# ========== Resumo ==========
ws = wb.create_sheet("Resumo")
ws["A1"] = "Saldos entre vocês + quanto cada um está gastando na viagem"
ws["A1"].font = title_font
ws.merge_cells("A1:H1")

headers = [
    "Membro",
    "Total pagou (R$)",
    "Cota comum (R$)",
    "Gastos pessoais (R$)",
    "Custo da viagem (R$)",
    "Saldo Splitwise (R$)",
    "Situação",
]
ws.append([])
ws.append(headers)
hdr(ws, 3, 7)

# Helper columns logic with SUMIFS:
# Pagou = SUMIF quem pagou
# Cota comum = sum of cota col where Tipo=Compartilhado — need SUMIF on tipo per row hard in openpyxl without helper
# Simpler approach: add helper columns in Gastos already as cotas.
# For "pessoal" portion of cota for Eduardo: SUMIFS(J:J, E:E, "Pessoal", ... no that sums all personal cotas in J which are only Eduardo's when pessoal)
# Actually when Pessoal, only payer has cota in their column. So:
# Gastos pessoais Eduardo = SUMIFS(J:J, E:E, "Pessoal")  — wait SUMIFS(J:J, $E:$E, "Pessoal") sums Eduardo's cota column only where tipo pessoal — and those rows only have value in J when Eduardo paid. Good!
# Cota comum Eduardo = SUMIFS(J:J, E:E, "Compartilhado")
# Or Total cota = SUM(J:J) = comum + pessoal
# Custo viagem = SUM(J:J) for that person
# Saldo = Pagou - Total cota

cota_cols = {"Eduardo": "J", "Karina": "K", "Bruno": "L", "Gabriele": "M"}
for i, nome in enumerate(MEMBROS):
    r = 4 + i
    cc = cota_cols[nome]
    ws.cell(r, 1, nome)
    ws.cell(r, 2, f'=SUMIF(Gastos!D:D,A{r},Gastos!C:C)')
    ws.cell(r, 3, f'=SUMIF(Gastos!E:E,"Compartilhado",Gastos!{cc}:{cc})')
    ws.cell(r, 4, f'=SUMIF(Gastos!E:E,"Pessoal",Gastos!{cc}:{cc})')
    ws.cell(r, 5, f'=C{r}+D{r}')  # custo viagem
    ws.cell(r, 6, f'=B{r}-E{r}')  # saldo
    ws.cell(r, 7, f'=IF(F{r}>0.009,"A receber",IF(F{r}<-0.009,"A pagar","Quitado"))')
    for c in range(2, 7):
        ws.cell(r, c).number_format = "#,##0.00"
        ws.cell(r, c).border = thin
    ws.cell(r, 1).border = thin
    ws.cell(r, 7).border = thin

ws.conditional_formatting.add("F4:F7", CellIsRule(operator="greaterThan", formula=["0.009"], fill=pos_fill))
ws.conditional_formatting.add("F4:F7", CellIsRule(operator="lessThan", formula=["-0.009"], fill=neg_fill))

ws["A9"] = "Totais do grupo"
ws["A9"].font = Font(bold=True)
ws["A10"] = "Soma dos saldos (deve ser ~0):"
ws["B10"] = "=SUM(F4:F7)"
ws["B10"].number_format = "#,##0.00"
ws["A11"] = "Soma dos custos da viagem (4 pessoas):"
ws["B11"] = "=SUM(E4:E7)"
ws["B11"].number_format = "#,##0.00"
ws["A12"] = "Total lançado na aba Gastos:"
ws["B12"] = '=SUM(Gastos!C:C)'
ws["B12"].number_format = "#,##0.00"

ws["A14"] = "Filtro rápido na aba Gastos"
ws["A14"].font = Font(bold=True, color="1F4E79")
ws["A15"] = "Use o filtro da coluna Tipo = Pessoal ou Compartilhado. Ou filtre Quem pagou = seu nome para ver só o que você lançou/pagou."
ws["A16"] = "Coluna Custo da viagem = o que interessa para 'quanto estou gastando' (sua parte + seus pessoais)."

width(ws, [16, 16, 16, 16, 18, 18, 12])

# ========== Acertos ==========
ws = wb.create_sheet("Acertos")
ws["A1"] = "Acertos entre o grupo (só saldo compartilhado na prática)"
ws["A1"].font = title_font
ws["A3"] = (
    "Os gastos pessoais não geram dívida. Acertes Pix/Zelle com base no Saldo Splitwise da aba Resumo. "
    "Registre abaixo quando transferir."
)
ws["A3"].alignment = Alignment(wrap_text=True)
ws.merge_cells("A3:F3")
ws.row_dimensions[3].height = 40

ws["A5"] = "Membro"
ws["B5"] = "Saldo (R$)"
ws["C5"] = "Situação"
hdr(ws, 5, 3)
for i in range(4):
    r = 6 + i
    ws.cell(r, 1, f"=Resumo!A{4+i}")
    ws.cell(r, 2, f"=Resumo!F{4+i}")
    ws.cell(r, 2).number_format = "#,##0.00"
    ws.cell(r, 3, f"=Resumo!G{4+i}")

ws["A11"] = "Registro de transferências"
ws["A11"].font = Font(bold=True)
ws["A11"].fill = hint_fill
ws["A12"] = "Data"
ws["B12"] = "De (paga)"
ws["C12"] = "Para (recebe)"
ws["D12"] = "Valor (R$)"
ws["E12"] = "Feito?"
ws["F12"] = "Obs"
hdr(ws, 12, 6)

dv_de = DataValidation(type="list", formula1='"Eduardo,Karina,Bruno,Gabriele"', allow_blank=True)
dv_para = DataValidation(type="list", formula1='"Eduardo,Karina,Bruno,Gabriele"', allow_blank=True)
ws.add_data_validation(dv_de)
ws.add_data_validation(dv_para)
dv_de.add("B13:B32")
dv_para.add("C13:C32")
dv_ok = DataValidation(type="list", formula1='"TRUE,FALSE"', allow_blank=True)
ws.add_data_validation(dv_ok)
dv_ok.add("E13:E32")
for r in range(13, 33):
    ws.cell(r, 5, False)
    ws.cell(r, 4).number_format = "#,##0.00"
    for c in range(1, 7):
        ws.cell(r, c).border = thin

width(ws, [12, 14, 14, 12, 10, 28])

# ========== Categorias ==========
ws = wb.create_sheet("Categorias")
ws["A1"] = "O que lançar e como classificar"
ws["A1"].font = title_font
ws.append(["Tipo", "Categoria", "Exemplos", "Marcar quem?"])
hdr(ws, 2, 4)
rows = [
    ("Compartilhado", "Casa / Carro / Seguro / Parking / Gasolina / Mercado", "Custos dos 4 adultos", "Os 4"),
    ("Compartilhado", "Comida / Uber / Outro comum", "Quando o grupo (ou parte) divide", "Quem participou"),
    ("Pessoal", "Ingresso", "Seu Disney/Universal/SeaWorld (se cada um compra o seu)", "Automático = quem pagou"),
    ("Pessoal", "Internet / Seguro viagem", "e-SIM, seguro individual", "Automático"),
    ("Pessoal", "Lembrancinha / Roupa / Farmácia", "Compras só suas", "Automático"),
    ("Pessoal", "Comida", "Almoço sozinho, snack só seu", "Automático"),
    ("Pessoal", "Outro pessoal", "Qualquer gasto só seu que queira somar no custo da viagem", "Automático"),
]
for row in rows:
    ws.append(list(row))
width(ws, [14, 40, 55, 28])

out = Path(r"C:\Users\eyonamine\Projects\orlando-viagem\gastos-compartilhados.xlsx")
wb.save(out)
print("OK", out)
