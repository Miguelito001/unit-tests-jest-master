const Banco = require("../src/banco");

describe('Testes da classe Banco', () => {
    let conta;

    beforeEach(() => {
        contaZerada = new Banco('Conta Zerada');
        contaSaldo = new Banco('Conta Com Saldo', 10);
    });

    test('Deve depositar dinheiro corretamente', () => {
        contaSaldo.depositar(7.7);
        expect(contaSaldo.obterSaldo()).toBe(17.7);
    });

    test('Deve sacar dinheiro corretamente', () => {
        contaSaldo.sacar(5);
        expect(contaSaldo.obterSaldo()).toBe(5);
    });

    test('Deve transferir dinheiro corretamente', () => {
        contaSaldo.transferir(3, contaZerada);
        expect(contaZerada.obterSaldo()).toBe(3);
        expect(contaSaldo.obterSaldo()).toBe(7);
    });

    test('Deve Obter histórico de transações corretamente', () => {
        contaSaldo.depositar(7.7);
        contaSaldo.sacar(5);
        contaSaldo.transferir(3, contaZerada);
        expect(contaSaldo.obterHistorico()).toEqual([
            { tipo: 'Depósito', valor: 7.7 },
            { tipo: 'Saque', valor: 5 },
            { tipo: 'Transferência', valor: 3, destino: 'Conta Zerada' }
        ]);
    });

    test('Deve definir limite de saque corretamente', () => {
        contaSaldo.definirLimiteDeSaque(10);
        expect(contaSaldo.limiteDeSaque).toBe(10);
    });

    test('Deve verificar se saque está dentro do limite corretamente', () => {
        contaSaldo.definirLimiteDeSaque(10);
        expect(contaSaldo.verificarLimiteDeSaque(5)).toBeTruthy();
    });

    test('Deve aplicar juros ao saldo corretamente', () => {
        contaSaldo.aplicarJuros(10);
        expect(contaSaldo.obterSaldo()).toBe(11);
    }  );

    test('Deve validar saque acima do limite', () => {
        contaSaldo.definirLimiteDeSaque(5);
        expect(() => {
            contaSaldo.sacar(6);
        }).toThrow('Saque acima do limite permitido');
    });

    test ('Pagar conta', () => {
        contaSaldo.pagarConta(5);
        expect(contaSaldo.obterSaldo()).toBe(5);
    });

    test('Deve validar saque sem saldo', () => {
        expect(() => {
            contaSaldo.sacar(15);
        }).toThrow('Saldo insuficiente');
    });

    test('Obter total de contas', () => {
        expect(Banco.contas).toBe(2);
    });

    test('Deve obter total depositado', () => {
        contaSaldo.depositar(5);
        expect(contaSaldo.obterSaldo()).toBe(15);
    });

    test('Deve validar saque sem saldo', () => {
        expect(() => {
            contaSaldo.sacar(15);
        }).toThrow('Saldo insuficiente');
    });

    test('Deve validar saque sem saldo', () => {
        expect(() => {
            contaSaldo.sacar(15);
        }).toThrow('Saldo insuficiente');
    });

});