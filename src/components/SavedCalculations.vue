<script setup lang="ts">
/**
 * SavedCalculations Component
 *
 * Reusable component to display saved calculations
 * Compatible with all calculators (MP, QR, future ones)
 */

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { SavedCalculation } from 'src/composables/useSavedCalculations';

interface Props {
  calculatorType: 'mp' | 'qr';
  calculations: SavedCalculation[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  remove: [index: number];
}>();

const { t } = useI18n({ useScope: 'global' });

const resultUnit = computed((): string => {
  switch (props.calculatorType) {
    case 'mp':
      return 'J/min';
    case 'qr':
      return 'ml-O₂/dL';
    default:
      return '';
  }
});

const columns = computed(() => [
  {
    name: 'initials',
    align: 'left' as const,
    label: t('savedCalc.columns.initials'),
    field: 'initials',
    sortable: true,
  },
  {
    name: 'result',
    align: 'center' as const,
    label: `${t('savedCalc.columns.result')} (${resultUnit.value})`,
    field: 'result',
    sortable: true,
  },
  {
    name: 'time',
    align: 'center' as const,
    label: t('savedCalc.columns.time'),
    field: 'time',
    sortable: true,
  },
  {
    name: 'date',
    align: 'center' as const,
    label: t('savedCalc.columns.date'),
    field: 'date',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right' as const,
    label: t('savedCalc.columns.actions'),
    field: 'actions',
  },
]);

function handleRemove(index: number): void {
  emit('remove', index);
}

async function exportPDF(): Promise<void> {
  try {
    const jsPDFModule = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;

    const { jsPDF } = jsPDFModule;
    const doc = new jsPDF();

    const title = t(`savedCalc.pdfTitle.${props.calculatorType}`);

    doc.setFontSize(16);
    doc.text(title, 14, 15);
    doc.setFontSize(10);
    doc.text(`${t('savedCalc.date')}: ${new Date().toLocaleDateString()}`, 14, 22);

    const tableData = props.calculations.map((calc) => [
      calc.initials,
      calc.date,
      calc.time,
      `${calc.result} ${resultUnit.value}`,
    ]);

    autoTable(doc, {
      startY: 28,
      head: [
        [
          t('savedCalc.columns.initials'),
          t('savedCalc.columns.date'),
          t('savedCalc.columns.time'),
          `${t('savedCalc.columns.result')} (${resultUnit.value})`,
        ],
      ],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [63, 81, 181] },
    });

    const filename = `${props.calculatorType}_calcoli_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error('Errore export PDF:', error);
  }
}

async function exportExcel(): Promise<void> {
  try {
    const XLSX = await import('xlsx');

    const worksheetData = [
      [
        t('savedCalc.columns.initials'),
        t('savedCalc.columns.date'),
        t('savedCalc.columns.time'),
        `${t('savedCalc.columns.result')} (${resultUnit.value})`,
      ],
      ...props.calculations.map((calc) => [calc.initials, calc.date, calc.time, calc.result]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();

    const sheetName = t(`savedCalc.excelSheetName.${props.calculatorType}`);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const filename = `${props.calculatorType}_calcoli_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Errore export Excel:', error);
  }
}
</script>

<template>
  <div v-if="calculations.length > 0" class="saved-calculations q-mt-md">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2">
        <div class="row items-center">
          <div class="col">
            <div class="text-subtitle1 text-weight-medium">
              <q-icon name="history" class="q-mr-sm" />
              {{ t('savedCalc.title') }}
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              dense
              round
              icon="picture_as_pdf"
              color="negative"
              size="sm"
              @click="exportPDF"
            >
              <q-tooltip>{{ t('savedCalc.tooltips.exportPDF') }}</q-tooltip>
            </q-btn>
            <q-btn
              flat
              dense
              round
              icon="table_chart"
              color="positive"
              size="sm"
              class="q-ml-xs"
              @click="exportExcel"
            >
              <q-tooltip>{{ t('savedCalc.tooltips.exportExcel') }}</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-table
          :rows="calculations"
          :columns="columns"
          row-key="id"
          flat
          dense
          :rows-per-page-options="[5, 10]"
          :pagination="{ rowsPerPage: 5 }"
          wrap-cells
        >
          <template #body-cell-result="slotProps">
            <q-td :props="slotProps">
              <span class="text-weight-bold text-primary">
                {{ slotProps.row.result }}
              </span>
            </q-td>
          </template>

          <template #body-cell-actions="slotProps">
            <q-td :props="slotProps">
              <q-btn
                flat
                dense
                round
                icon="delete"
                color="negative"
                size="sm"
                @click="handleRemove(slotProps.rowIndex)"
              >
                <q-tooltip>{{ t('savedCalc.tooltips.delete') }}</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.saved-calculations {
  width: 100%;
  margin-bottom: 20px;
}
</style>
