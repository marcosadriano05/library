import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class BookEntityCreation1634860987954 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'book',
				columns: [
					{
            name: 'id',
            type: 'int',
            isPrimary: true
          },
					{
            name: 'title',
            type: 'varchar'
          },
					{
            name: 'description',
            type: 'varchar'
          },
					{
            name: 'price',
            type: 'real'
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
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('book')
	}

}
