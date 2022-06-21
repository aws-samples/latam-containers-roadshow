# LATAM Containers Roadshow - Workshop de Amazon ECS

[**< Voltar**](./5-Automate.md)

## Capítulo 5 - Limpando a Bagunça

Nesse capítulo vamos limpar os recursos que foram criados na conta AWS usada nos exercícios. **Não execute as etapas caso queira explorar o que foi criado no workshop!**

1. Primeiro vamos apagar a esteira do AWS CodePipeline:

```bash
copilot pipeline delete
```

2. Depois vamos apagar a `Application` no AWS Copilot, que vai apagar os `Services` e os `Environments` em cascata:

```bash
copilot app delete
```

3. Em sequência vamos apagar o nosso repositório de código do AWS CodeCommit:

```bash
aws codecommit delete-repository --repository-name todoapp
```

4. E, por fim, apagar o diretório `src/copilot` criado pelo AWS Copilot:

```bash
cd ~/environment/latam-containers-roadshow/ecs/src/
rm -rf copilot/
```

E isso é tudo, pessoal!

[**Próximo >**](./README.md)