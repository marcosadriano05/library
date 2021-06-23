import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateObras1624488487100 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'obras',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'publisher',
            type: 'varchar'
          },
          {
            name: 'photo',
            type: 'varchar'
          },
          {
            name: 'authors',
            type: 'varchar',
            isArray: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('obras')
  }

}
